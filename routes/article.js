const express = require("express");
const articleCollection = require("../collections/article");
const auth = require("../middlewares/auth");

const route = express.Router();

route.post("/", articleCollection.createArticle);

module.exports = route;
