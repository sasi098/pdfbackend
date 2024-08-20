const express = require("express");
const multer = require("multer");
const router = express.Router();

const userController = require("../usercontroller/users");
const userPdfs = require("../usercontroller/userpdfs");
const userimg = require("../usercontroller/userimages");

router.post("/createUser", userController.createUser);
router.post("/loginUser", userController.loginUser);

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("pdf"), userPdfs.uploadPDF);
router.post("/getpdf", userPdfs.getPdf);
router.post("/addlinks", userPdfs.addlinks);

router.post("/addimg", userimg.addimg);
router.post("/getimg", userimg.getlinks);

module.exports = router;
