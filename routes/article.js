const express = require("express");
const articleConroller = require("../controllers/article");
const auth = require("../middlewares/auth");

const route = express.Router();

//GET ROUTE
route.get("/:id/v1", articleConroller.getArticles);
route.get("/v1", articleConroller.getAllArticles);

//POST ROUTE
route.post("/v1", articleConroller.createArticle);
route.post("/:artculeid/comment/v1", articleConroller.postComment);

// DELETE ROUTE
route.delete("/:id/v1", articleConroller.deleteArticle);

//UPDATE ROUTE
route.patch("/:id/v1", articleConroller.updateArticle);

module.exports = route;
