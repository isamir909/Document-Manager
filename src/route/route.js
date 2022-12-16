const express = require("express");
const route = express.Router();
const userController = require("../controller/userController");
const documentController = require("../controller/documentController");
const { auth } = require("../middleware/authentication");



route.get("/test", (req, res) => {res.send({ test: "hello" })});

route.post("/login", userController.login);

route.post("/register", userController.register);

route.put("/user/:id", auth, userController.updateUser);

route.post("/upload-document", auth, documentController.uploadDocument);

route.get("/documents", auth, documentController.getDocuments);

route.get("/documents/:documentid/to-text", auth, documentController.toText);

route.delete("/documents/:documentid", auth, documentController.deleteDocument);

module.exports = route;
