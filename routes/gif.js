const express = require("express");
const gifController = require("../controllers/gif");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");

const route = express.Router();

//GET ROUTES
route.get("/:gifid", auth, gifController.getGif);
route.get("/feed", auth, gifController.getAllGifs);

//POST ROUTES
route.post("/", auth, upload.single("image"), gifController.createGif);
route.post("/:gifid/comment", auth, gifController.postGifComment);

//DELETE ROUTES
route.delete("/:id", auth, gifController.deleteGif);

module.exports = route;
