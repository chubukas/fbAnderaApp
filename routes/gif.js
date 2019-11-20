const express = require("express");
const gifController = require("../controllers/gif");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");

const route = express.Router();

//GET ROUTES
route.get("/:gifid/v1", auth, gifController.getGif);
route.get("/feed/v1", auth, gifController.getAllGifs);

//POST ROUTES
route.post("/v1", auth, upload.single("image"), gifController.createGif);
route.post("/:gifid/comment/v1", auth, gifController.postGifComment);

//DELETE ROUTES
route.delete("/:id/v1", auth, gifController.deleteGif);

module.exports = route;
