const express = require("express");
const gifController = require("../controllers/gif");
const upload = require("../middlewares/multer");

const route = express.Router();

//GET ROUTES
route.get("/:gifid/v1", gifController.getGif);
route.get("/v1", gifController.getAllGifs);

//POST ROUTES
route.post("/v1", upload.single("image"), gifController.createGif);
route.post("/:gifid/comment/v1", gifController.postGifComment);

//DELETE ROUTES
route.delete("/:id/v1", gifController.deleteGif);

module.exports = route;
