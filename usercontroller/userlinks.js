const { Pdfs } = require("../schema/userschema");

exports.addlinks = async (req, res) => {
  try {
    const { filename, links } = req.body;
    let pdf = await Pdfs.findOne({ filename });
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
