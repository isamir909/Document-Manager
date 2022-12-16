require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./route/route");
const multer = require("multer");
const app = express();


app.use(cors());
app.use(multer().any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb is connected "))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, () => {
  console.log(`express app running on ${process.env.PORT || 3000}`);
});
