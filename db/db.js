const { Pool } = require("pg");
const query = require("./tables");

const dbCreate = () => {
  try {
    const pool = new Pool({
      connectionString: "postgres://postgres:student55@127.0.0.1:5432/teamwork"
    });

    pool
      .connect()
      .then(() => {
        console.log("connected to database");

        // Connecting the tables
        pool
          .query(query.userTable)
          .then(() => {
            console.log("userTable created successfully");
          })
          .catch(err => {
            console.log(err);
            pool.end();
          });
        pool
          .query(query.gifCommentTable)
          .then(() => {
            console.log("gifCommentTable created successfully");
          })
          .catch(err => {
            console.log(err);
            pool.end();
          });
        pool
          .query(query.gifTable)
          .then(() => {
            console.log("gifTable created successfully");
          })
          .catch(err => {
            console.log(err);
            pool.end();
          });

        pool
          .query(query.articleCommentTable)
          .then(() => {
            console.log("articleCommentTable created successfully");
          })
          .catch(err => {
            console.log(err);
            pool.end();
          });

        pool
          .query(query.articleTable)
          .then(() => {
            console.log("articleTable created successfully");
            pool.end();
          })
          .catch(err => {
            console.log(err);
            pool.end();
          });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log(`This is the catch error ${error} `);
  }
};

module.exports = dbCreate;
