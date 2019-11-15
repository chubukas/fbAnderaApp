process.env.NODE_ENV = "test";

const user = require("../controllers/users");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
