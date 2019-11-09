const { Pool } = require("pg");

const dbCreate = () => {
  const pool = new Pool({
    connectionString: "postgres://postgres:student55@127.0.0.1:5432/teamwork"
  });

  pool
    .connect()
    .then(() => {
      console.log("connected to database");
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * Create Tables
 */
// const createTables = () => {
//   const queryText = `CREATE TABLE IF NOT EXISTS
//       reflections(
//         id UUID PRIMARY KEY,
//         success VARCHAR(128) NOT NULL,
//         low_point VARCHAR(128) NOT NULL,
//         take_away VARCHAR(128) NOT NULL,
//         created_date TIMESTAMP,
//         modified_date TIMESTAMP
//       )`;

//   pool
//     .query(queryText)
//     .then(res => {
//       console.log(res);
//       pool.end();
//     })
//     .catch(err => {
//       console.log(err);
//       pool.end();
//     });
// };

module.exports = dbCreate;
