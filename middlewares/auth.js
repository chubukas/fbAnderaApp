const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    const verfiedToken = jwt.verify(token, "it has been fun");
    const useremail = verfiedToken.email;
    if (req.body.email && req.body.email !== useremail) {
      throw "You are not authorize for the request";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: "Error",
      data: "You are not authorize for the request"
    });
  }
};
