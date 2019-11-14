const express = require("express");
const gifController = require("../controllers/gif");
const upload = require("../middlewares/multer");

const route = express.Router();

route.post("/", upload.single("image"), gifController.createGif);
route.delete("/:id", gifController.deleteGif);
route.post("/:gifid/comment", gifController.postGifComment);
route.get("/:gifid", gifController.getGif);

module.exports = route;
