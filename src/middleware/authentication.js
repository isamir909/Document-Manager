const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

let auth = async (req, res, next) => {
  try {
    let token = req.headers.jwt;
   
    if (!token)return res.status(400).send({ status: false, message: "Token is required, please login" });

    let decodedToken = jwt.verify(token, "intoglo!@#$%^&*()intoglo");
    if (!decodedToken)return res.status(401).send({ status: false, msg: "Authentication failed" });

    let user = await userModel.findById(decodedToken.id);
    if (!user)return res.status(404).send({ status: false, message: "User Not Found" });

    req.body["userid"] = decodedToken.id;
    next();
    
  } catch (error) {
    if (error.message === "jwt expired")return res.status(401).send({ status: false, msg: " Your token is expired " });
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { auth };
