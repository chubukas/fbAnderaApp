const express = require("express");
const articleConroller = require("../controllers/article");
const auth = require("../middlewares/auth");

const route = express.Router();

//GET ROUTE
route.get("/:id/v1", auth, articleConroller.getArticles);
route.get("/feed/v1", auth, articleConroller.getAllArticles);

//POST ROUTE
route.post("/v1", auth, articleConroller.createArticle);
route.post("/:artculeid/comment/v1", auth, articleConroller.postComment);

// DELETE ROUTE
route.delete("/:id/v1", auth, articleConroller.deleteArticle);

//UPDATE ROUTE
route.patch("/:id/v1", auth, articleConroller.updateArticle);

module.exports = route;
