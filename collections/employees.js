const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgres://postgres:student55@127.0.0.1:5432/teamwork"
});
exports.postEmployee = (req, res, next) => {
  const query = {
    querys: `INSERT INTO employees VAUES (id serial PRIMARY KEY NOT NULL,
        firstName ,
        lastName ,
        email ,
        password ,
        gender ,
        jobRole ,
        department ,
        address ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,)`,
    values: ["ebuka", "mark", "sss", "0000", "male", "marking", "cpmaputrr"]
  };

//   pool.connect();
  pool
    .query(query)
    .then(result => {
      console.log(result + res.row[0]);
      res.status(200).json({ data: res.row[0] });
    })
    .catch(err => {
      console.log(err);
    });
};
