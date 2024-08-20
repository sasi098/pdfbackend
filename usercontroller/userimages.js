const { Img } = require("../schema/userschema");
const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("img");

exports.addimg = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to upload image" });
    }
    try {
      const { title, exam } = req.body;
      const imgPath = req.file.path;

      const newImage = new Img({ img: imgPath, title, exam });
      await newImage.save();

      res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload image" });
      console.log(error);
    }
  });
};

exports.getlinks = async (req, res) => {
  try {
    const { title } = req.body;
    const image = await Img.find({ title });
    if (image) {
      res.status(201).json({ exam: image.exam, pdf: image });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
