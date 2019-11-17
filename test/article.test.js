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
          res.should.have.status(404);
          expect(res.body.message).to.equals("Not Created");
          done();
        });
    });

    it("Should Send Article to Database", done => {
      let date = new Date();
      let input = {
        title: "best book",
        article: "its all good",
        postedBy: "Emam Emam",
        date
      };

      chai
        .request(app)
        .post("/articles/v1")
        .send(input)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.an("object");
          expect(res.body.status).to.equals("Success");
          expect(res.body.data.message).to.equals(
            "Article Created Successfully"
          );
          expect(res.body.data).to.have.property("articleID");
          expect(res.body.data).to.have.property("createdOn");
          expect(res.body.data).to.have.property("title");
          done();
        });
    });

    it("Should Post comment", done => {
      let value = {
        comment: "it is my comment and its good",
        artculeid: 3
      };
      chai
        .request(app)
        .post("/articles/" + value.artculeid + "/comment/v1")
        .send(value)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.an("object");
          expect(res.body.status).to.equals("success");
          expect(res.body.data).to.be.an("object");
          expect(res.body.data.message).to.equals(
            "Comment successfully created"
          );
          expect(res.body.data).to.have.property("createdOn");
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
          res.should.have.status(404);
          expect(res.body.status).to.equals("Error");
          expect(res.body.message).to.equals("Not Available");
          done();
        });
    });
    it("Should Return An Article", done => {
      let value = { id: 6 };

      chai
        .request(app)
        .get("/articles/" + value.id + "/v1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          expect(res.body.status).to.equals("Success");
          expect(res.body.data).to.be.an("object");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("createdOn");
          expect(res.body.data).to.have.property("title");
          expect(res.body.data).to.have.property("article");
          expect(res.body.data).to.have.property("comments");
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
          res.should.have.status(404);
          res.body.should.be.an("object");
          expect(res.body.data.message).to.equals(
            "No Such Article is our Database"
          );
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
