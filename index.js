const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
app.use(express.json());
const cors = require("cors");
app.use(cors());
// const multer = require("multer");
const router = require("./userroutes/userroutes1");

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/PDFS");
    console.log("db connected successfully");
  } catch (error) {
    console.log(error);
  }
};
app.get("/", (req, res) => {
  res.send("hey this is server");
  res.end();
});

app.use("/users", router);
app.use("/pdfs", router);
app.use("/img", router);
// app.use("/links", router);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(4000, () => {
  console.log("server is running under port 4000");
  db();
});
