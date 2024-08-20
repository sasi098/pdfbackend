const { Pdfs } = require("../schema/userschema");

exports.uploadPDF = async (req, res) => {
  try {
    const { filename } = req.body;
    const filePath = req.file.path;

    const newPDF = new Pdfs({ filename, filepath: filePath });
    await newPDF.save();

    res.status(201).json({ message: "PDF uploaded successfully", pdf: newPDF });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload PDF" });
    console.log("error in usercontroller", error);
  }
};

exports.getPdf = async (req, res) => {
  try {
    const { filename } = req.body;
    const pdf = await Pdfs.findOne({ filename: filename });
    if (pdf) {
      res.status(201).json({ pdf, message: "PDF retrieved successfully" });
    } else {
      res.status(404).json({ message: "PDF not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve PDF" });
  }
};

exports.addlinks = async (req, res) => {
  try {
    const { filename, links } = req.body;
    let pdf = await Pdfs.findOne({ filename: filename });
    if (pdf) {
      pdf.links.push(...links);
    } else {
      pdf = new Pdfs({ filename, links });
    }
    await pdf.save();
    res.status(200).json({ message: "Links added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding links" });
  }
};
