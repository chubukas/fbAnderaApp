const express = require("express");
const articleConroller = require("../controllers/article");
const auth = require("../middlewares/auth");

const route = express.Router();

//GET ROUTE
route.get("/:id", auth, articleConroller.getArticles);
route.get("/feed", auth, articleConroller.getAllArticles);

//POST ROUTE
route.post("/", auth, articleConroller.createArticle);
route.post("/:artculeid/comment", auth, articleConroller.postComment);

// DELETE ROUTE
route.delete("/:id", auth, articleConroller.deleteArticle);

//UPDATE ROUTE
route.patch("/:id", auth, articleConroller.updateArticle);

module.exports = route;
