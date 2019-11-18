const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/gif"
    ) {
      callback(null, "../images");
    } else {
      callback(
        {
          message: "This file is not gif file, please upload a gif file"
        },
        false
      );
    }
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
