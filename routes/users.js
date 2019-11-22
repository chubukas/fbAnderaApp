const express = require("express");
const usersCollections = require("../controllers/users");
const auth = require("../middlewares/auth");

const route = express.Router();

route.post("/create-user", usersCollections.createUsers);
route.post("/signin", usersCollections.signInUsers);

module.exports = route;
