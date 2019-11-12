const { Pool } = require("pg");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const pool = new Pool({
  connectionString: process.env.DB_HOST
});

// CREATE USERS FUNCTION
exports.createUsers = async (req, res, next) => {
  try {
    const checkEmail = req.body.email;
    const query = `SELECT email FROM employees WHERE email = $1`;
    let go = await pool.query(query, [checkEmail]);
    let duplicate = go.rowCount > 0 ? true : false;

    if (duplicate) {
      res.status(404).json({ data: `User Already Resgistered` });
      return false;
    } else {
      const Role = req.body.jobRole;
      const userdata = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: checkEmail,
        password: req.body.password,
        gender: req.body.gender,
        jobRole: Role,
        dept: req.body.dept,
        address: req.body.address
      };

      const querys = `INSERT INTO employees (firstName, lastName, email, password, gender, jobRole, department, address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
      const value = [
        userdata.fname,
        userdata.lname,
        userdata.email,
        userdata.password,
        userdata.gender,
        userdata.jobRole,
        userdata.dept,
        userdata.address
      ];

      pool
        .query(querys, value)
        .then(result => {
          //json token
          const token = jwt.sign(
            { email: result.rows[0].email },
            "it has been fun",
            {
              expiresIn: "24hour"
            }
          );
          res.status(201).json({
            status: "success",
            data: {
              message: "User account successfully created",
              token: token,
              userId: result.rows[0].id
            }
          });
        })
        .catch(err => {
          res.status(404).json({
            status: `Error`,
            data: `Error in Upadate, Please try again `
          });
          console.log(err);
        });
    }
  } catch (error) {
    console.log(`this is catch error :  ${error}`);
  }
};

// SIGN FUNCTION
exports.signInUsers = async (req, res, next) => {
  try {
    const checkEmail = req.body.email;
    const password = req.body.password;
    const query = `SELECT email,password FROM employees WHERE email = $1 AND password = $2`;
    let go = await pool.query(query, ["chubu", "1111"]);

    let notDuplicate = go.rows[0].email !== "chubu" ? true : false;
    let notMarch = go.rows[0].password !== "1111" ? true : false;

    if (notDuplicate && notMarch) {
      res.status(401).json({
        status: "error",
        data: `User Is Not Registered, Please Resgister`
      });
    } else if (notMarch && !notDuplicate) {
      res.status(401).json({
        status: "error",
        data: `Incorrect Password: Please Enter the correct password`
      });
    } else if (!notMarch && notDuplicate) {
      res.status(401).json({
        status: "error",
        data: `Incorrect Email: Please Enter the correct Email`
      });
    }
    //json token
    const token = jwt.sign({ email: go.rows[0].email }, "it has been fun", {
      expiresIn: "24hour"
    });
    res.status(200).json({
      status: `Success`,
      data: `You are highly welcome`,
      token: token
    });
  } catch (error) {
    console.log(`${error}`);
  }
};
