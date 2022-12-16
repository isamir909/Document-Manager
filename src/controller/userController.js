const userModel=require("../model/userModel")
const validator=require("validator")
const {uploadFile}=require("../aws/aws")
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');



const register=async(req,res)=>{
  try {

    let data=req.body
    let file=req.files
    console.log(data,file);
    if(!data.name || !data.email || !data.password || !data.phone)return res.status(400).send({status:false,message:"please fill up all fields"})
    if(!validator.isAlpha(data.name))return res.status(400).send({status:false,message:"name must be between A-Z or a-z"})
    if(!validator.isEmail (data.email))return res.status(400).send({status:false,message:"email should be valid"})
    if(!validator.isNumeric(data.phone) ||data.phone.length!==10)return res.status(400).send({status:false,message:"phone number should be valid"})
    if(!validator.isStrongPassword(data.password))return res.status(400).send({status:false,message:"password should be strong (minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)"})
    const findEmail= await userModel.findOne({email:data.email})
    if(findEmail)return res.status(400).send({status:false,message:"email already present try another "})
   
    // encrypting password
    const saltRounds = 10; 
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash 
     
    if (file && file.length > 0) {
      let uploadedFileURL = await uploadFile(file[0])
      data["profilePicture"] = uploadedFileURL
    }

    const createUser=await userModel.create(data)
    return res.status(201).send({status:true,message:"user created successfully"})

  } catch (error) {
    console.log(error);
    return res.status(500).send({status:false, message:error.message});
  }
  }
  
  const login=async(req,res)=>{
    try {
      let data=req.body
      
      if(!data.password)return res.status(400).send({status:false,message:"password is required"})
      if(!validator.isEmail (data.email))return res.status(400).send({status:false,message:"email should be valid"})
      
      let findUser=await userModel.findOne({email:data.email}).lean()
      if(!findUser)return res.status(404).send({status:false,message:"user not found"})
      
      let hash = findUser.password 
      let compare = bcrypt.compareSync(data.password, hash)
      if (!compare) return res.status(401).send({ status: false, message: "Incorrect Password" })

      let token = jwt.sign({
        id: findUser._id.toString(),
        iat: Math.floor(new Date().getTime()/ 1000)
    },
        "intoglo!@#$%^&*()intoglo", { expiresIn: "48h" });
        let response={...findUser}
        delete response.password

    res.setHeader("jwt", token);
    res.status(200).send({ status: true, message: "User login successful", token,...response });
    } catch (error) {
      return res.status(500).send({status:false, message:error.message});
  }
}

const updateUser=async (req,res)=>{
  try {
    let data=req.body
    let userId=req.body.userid
console.log(data);
    let findUser=await userModel.findById(userId).lean()
    if(!findUser)return res.status(404).send({status:false,message:"user not found"})

    if(data.email.length>1){
      if(!validator.isEmail (data.email))return res.status(400).send({status:false,message:"email should be valid"})
      findUser.email=data.email
    }
    if(data.name.length>1){
      if(!validator.isAlpha(data.name))return res.status(400).send({status:false,message:"name must be between A-Z or a-z"})
      findUser.name=data.name}

    if(data.phone.length>1){
      if(!validator.isNumeric(data.phone) ||data.phone.length!==10 )return res.status(400).send({status:false,message:"phone number should be valid"})
      findUser.phone=data.phone}
    if(data.password.length>1){
      if(!validator.isStrongPassword(data.password))return res.status(400).send({status:false,message:"password should be strong (minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)"})
      findUser.password=data.password
    }

    const updatedData=await userModel.findOneAndUpdate({_id:userId},{$set:findUser},{new:true})
    console.log(updatedData);

    return res.status(200).send({status:true,message:"data updated successfully",data:updatedData})
  } catch (error) {
    
    console.log(error);
    return res.status(500).send({status:false, message:error.message,});
  }
}


module.exports={register,login,updateUser}

