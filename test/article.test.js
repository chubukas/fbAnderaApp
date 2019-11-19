process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const should = chai.should();
const app = require("../app");

chai.use(chaiHttp);

describe("Article APIs", () => {
  describe("/POST Articles", () => {
    it("Should Give Error", done => {
      value = {};
      chai
        .request(app)
        .post("/articles/v1")
        .send(value)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/GET One Article", () => {
    it("Should Return An Error", done => {
      value = {};
      chai
        .request(app)
        .get("/articles/:id/v1")
        .send(value)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("DELETE /AN Article", () => {
    it("Should give an Error", done => {
      let value = { id: "0" };
      chai
        .request(app)
        .delete("/articles/" + value.id + "/v1")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
        });
      done();
    });
  });

  describe("/UPDATE an Article", () => {
    it("Should Get an Error", done => {
      chai
        .request(app)
        .put("/articles/" + 6 + "/v1")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
