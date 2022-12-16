const documentModel = require("../model/document");
const { uploadFile } = require("../aws/aws");
const userModel = require("../model/userModel");
const { xlsxToText } = require("./convertToText");
const pdf = require("pdf-parse");
const { default: axios } = require("axios");

const uploadDocument = async (req, res) => {
  try {
    let file = req.files[0];
    let userId = req.body.userid;

    if (!file)
      return res.status(400).send({ status: false, message: "invalid request" });
    let fileSize = (file.size / 1024).toFixed(2); //bytes to kb
    let extension = file.originalname.split(".");
    let data = {
      userId: userId,
      fileName: file.originalname,
      fileSize: fileSize,
      fileLink: "",
      extension: extension[1],
    };

    let checkStorageAvailability = await userModel.findById(userId);
    checkStorageAvailability = checkStorageAvailability.toObject();
    if (fileSize > checkStorageAvailability.availableStorage)
      return res.status(400).send({ status: false, message: "not enough space, try premium" });
    checkStorageAvailability.availableStorage = Number(
      (
        Number(checkStorageAvailability.availableStorage) - Number(fileSize)
      ).toFixed(2)
    );

    if (file) {
      let uploadedFileURL = await uploadFile(file);
      data["fileLink"] = uploadedFileURL;
    }

    let updateUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: checkStorageAvailability },
      { new: true }
    );

    let newFile = await documentModel.create(data);
    let response = {
      availableStorage: updateUser.availableStorage,
      totalStorageCapacity: updateUser.totalStorageCapacity,
    };

    return res.status(201).send({status: true,message: "file uploaded successfully",...response});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};


const getDocuments = async (req, res) => {
  try {
    let userId = req.body.userid;
    let findDocuments = await documentModel.find({ userId: userId,isDeleted:false });
    return res
      .status(200)
      .send({
        status: true,
        message: "document fetched successfully",
        data: findDocuments,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};


const toText = async (req, res) => {
  try {
    let params = req.params.documentid.toString();
    params = params.split(":")[1];

    let userId = req.body.userid;

    let getDocument = await documentModel.findById(params);

    if (!getDocument)
      return res.status(404).send({ status: false, message: "file not found" });
    if (getDocument.userId.toString() !== userId)
      return res
        .status(403)
        .send({ status: false, message: "unauthorize request" });

    if (getDocument.extension === "xlsx" || getDocument.extension === "csv") {
      const result = await xlsxToText(getDocument.fileLink);
     
      return res
        .status(200)
        .send({ status: true, message: "data converted to text", result });
    }
    if (getDocument.extension === "pdf") {
      let text = await pdf(getDocument.fileLink).then(function (data) {
        let result = data.text;

        return res
          .status(200)
          .send({ status: true, message: "data converted to text", result });
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
 
    let params = req.params.documentid.toString();
    let userId = req.body.userid;
   
    let getDocument = await documentModel.findById(params);
    if (!getDocument)
      return res.status(404).send({ status: false, message: "file not found" });
      console.log(getDocument.userId,userId);
    if (getDocument.userId.toString() !== userId)
      return res
        .status(403)
        .send({ status: false, message: "unauthorize request" });

    let deleteDoc = await documentModel.findOneAndUpdate(
      { _id: params },
      { $set: { isDeleted: true } }
    );

    // updating storage data on user
    let getUser = await userModel.findById(userId).lean();
  
    getUser.availableStorage = (
      Number(getUser.availableStorage) + Number(getDocument.fileSize)
    ).toFixed(2);

    let updateUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set:  getUser},
      { new: true }
    );

    let data = {
      availableStorage: updateUser.availableStorage,
    };
    return res
      .status(200)
      .send({ status: true, message: "deleted successfully", ...data });
  } catch (error) {}
};

module.exports = { uploadDocument, getDocuments, toText, deleteDocument };
