const express = require("express");
const employees = require("../collections/users");

const route = express.Router();

route.post("/createUser/v1", employees.postEmployee);
// route.get("/getUsers/v1", employees.getEmployees);

module.exports = route;
