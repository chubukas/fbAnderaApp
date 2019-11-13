const express = require("express");
const articleConroller = require("../controllers/article");
const auth = require("../middlewares/auth");

const route = express.Router();

route.post("/", articleConroller.createArticle);
route.get("/:id", articleConroller.getArticles);
route.delete("/:id", articleConroller.deleteArticle);
route.patch("/:id", articleConroller.updateArticle);
route.post("/:artculeid/comment", articleConroller.postComment);

module.exports = route;
