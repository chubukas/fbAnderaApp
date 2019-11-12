const express = require("express");
const usersCollections = require("../collections/users");

const route = express.Router();

route.post("/createUser/v1", usersCollections.createUsers);
route.post("/signIn/v1", usersCollections.signInUsers);

module.exports = route;
