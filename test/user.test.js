process.env.NODE_ENV = "test";

// const user = require("../controllers/users");

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../app");

const { expect } = chai;

chai.use(chaiHttp);
describe("Users", function() {
  this.timeout("30s");
  describe("/POST Users", () => {
    it("Should send the user in the database", done => {
      const value = {
        fname: "markseds123455e",
        lname: "lukeseds12345tr",
        email: "chu@gmailseds123454.come",
        password: "lokingsedf",
        gender: "female",
        jobRole: "staff",
        dept: "agic",
        address: "lagos"
      };

      chai
        .request(app)
        .post("/auth/createUser/v1")
        .send(value)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          expect(res.body.data.message).to.equals(
            "User account successfully created"
          );
          expect(res.body.data).to.have.property("token");
          expect(res.body.data).to.have.property("userId");
        });
      done();
    });
  });

  describe("/GET USERS", () => {
    it("Should retrun an error", done => {
      let value = {};
      chai
        .request(app)
        .post("/auth/signIn/v1")
        .send(value)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          expect(res.body.data.message).to.equals(
            "User Is Not Registered, Please Resgister"
          );
          expect(res.body.status).to.equals("error");
        });
      done();
    });

    it("Should retrun all the user in the database", done => {
      let value = {
        email: "chu@gmailseds12345.com",
        password: "lokingsed"
      };
      chai
        .request(app)
        .post("/auth/signIn/v1")
        .send(value)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          expect(res.body.data.message).to.equals("You are highly welcome");
          expect(res.body.data).to.have.property("token");
          expect(res.body.data).to.have.property("userId");
        });
      done();
    });
  });
});
