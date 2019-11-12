const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./db/db");
const app = express();
const UserRouter = require("./routes/users");
const articleRouter = require("./routes/article");

dbConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", UserRouter);
app.use("/articles", articleRouter);

module.exports = app;
