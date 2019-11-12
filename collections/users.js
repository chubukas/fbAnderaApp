const { Pool } = require("pg");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const pool = new Pool({
  connectionString: process.env.DB_HOST
});

exports.postEmployee = async (req, res, next) => {
  try {
    const query = `SELECT email FROM employees WHERE email = $1`;
    let go = await pool.query(query, ["chubu"]);
    let duplicate = go.rowCount > 0 ? true : false;

    if (duplicate) {
      res.status(404).json({ data: `User Already Resgistered` });
      return false;
    } else {
      const querys = `INSERT INTO employees (firstName, lastName, email, password, gender, jobRole, department, address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
      const value = [
        "ebuka",
        "mark",
        "chubu",
        "0000",
        "male",
        "marking",
        "cpmaputrr",
        "lagos"
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
          res.status(404).json({ err: `${err}` });
          console.log(err);
        });
    }
  } catch (error) {
    console.log(`this is catch error :  ${error}`);
  }
};
