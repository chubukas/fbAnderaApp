const express = require("express");
const employees = require("../collections/employees");

const route = express.Router();

route.post("/createUser", employees.postEmployee);
