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
      const querys = `INSERT INTO employees (firstName, lastName, email, password, gender, jobRole, department, address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
      const value = [
        req.body.fname,
        req.body.lname,
        checkEmail,
        req.body.password,
        req.body.gender,
        req.body.jobRole,
        req.body.dept,
        req.body.address
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
    const query = `SELECT email FROM employees WHERE email = $1`;
    pool
      .query(query, [checkEmail])
      .then(result => {
        if (result.rowCount < 1) {
          res.status(401).json({
            status: "error",
            data: { message: `User Is Not Registered, Please Resgister` }
          });
          stop();
        }
        const query = `SELECT email,password,id FROM employees WHERE email = $1 AND password = $2`;
        pool
          .query(query, [checkEmail, password])
          .then(datas => {
            if (password !== datas.rows[0].password) {
              res.status(401).json({
                status: "error",
                data: {
                  message: `Password Mismatch, Please enter the right password`
                }
              });
              stop();
            } else {
              //json token
              const token = jwt.sign(
                { email: datas.rows[0].email },
                "it has been fun",
                {
                  expiresIn: "24hour"
                }
              );
              res.status(200).json({
                status: `Success`,
                data: {
                  message: `You are highly welcome`,
                  token: token,
                  userId: datas.rows[0].id
                }
              });
            }
          })
          .catch(err => {
            res.json({
              err: err,
              status: "error",
              data: `Password Mismatch, Please enter the right password`
            });
          });
      })
      .catch(err => {
        // res.json({ err: `${err}` });
      });
  } catch (error) {
    console.log(error);
  }
};
