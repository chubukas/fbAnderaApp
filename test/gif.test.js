process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const should = chai.should();
const app = require("../app");

chai.use(chaiHttp);

describe("GIF APIs", () => {
  describe("/POST Articles", () => {
    it("Should Give Error", done => {
      value = {};
      chai
        .request(app)
        .post("/gifs/v1")
        .send(value)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/GET One Gif", () => {
    it("Should Return An Error", done => {
      value = {};
      chai
        .request(app)
        .get("/gifs/:id/v1")
        .send(value)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/DELETE a Gifs", () => {
    it("Should give an Error", done => {
      let value = { id: "0" };
      chai
        .request(app)
        .delete("/gifs/" + value.id + "/v1")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
        });
      done();
    });
  });
});
