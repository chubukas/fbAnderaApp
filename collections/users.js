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
            { id: result.rows[0].email },
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
    const query = `SELECT email FROM employees WHERE email = $1`;
    let go = await pool.query(query, [checkEmail]);
    let duplicate = go.rowCount > 0 ? true : false;

    if (!duplicate) {
      res.status(404).json({
        status: "error",
        data: `We don't have you in our database, Please kindly register`
      });
    } else {
      const datas = {
        email: checkEmail,
        password: req.body.password
      };

      const query = `SELECT password FROM employees WHERE password = $1`;
      let go = await pool.query(query, [datas.password]);
      let duplicate = go.rowCount > 0 ? true : false;

      if (!duplicate) {
        res.status(404).json({
          status: "error",
          data: `Incorrect Password, Please try again`
        });
      } else {
        res
          .status(200)
          .json({ status: `Success`, data: `You are highly welcome` });
      }
    }
  } catch (error) {}
};
