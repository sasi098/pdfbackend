const mongoose = require("mongoose");

const usersingnup = new mongoose.Schema(
  {
    uname: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
  }
);

const pdfschema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    links: [
      {
        url: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
  },
  {
    collection: "pdfs",
  }
);

const images = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    exam: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Img",
  }
);

module.exports = {
  Users: mongoose.model("users", usersingnup),
  Pdfs: mongoose.model("pdfs", pdfschema),
  Img: mongoose.model("Img", images),
};
