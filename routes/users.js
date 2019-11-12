const express = require("express");
const usersCollections = require("../collections/users");

const route = express.Router();

route.post("/createUser/v1", usersCollections.postEmployee);

module.exports = route;
