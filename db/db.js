const { Pool } = require("pg");

const query = require("./tables");
require("dotenv").config();


const dbCreate = () => {
  try {
    const pool = new Pool({
      connectionString: process.env.DB_HOST
    });

    pool
      .connect()
      .then(() => {
        console.log("connected to database");

        // Connecting the tables
        pool
          .query(tables.userTable)
          .then(() => {
            console.log("userTable created successfully");
          })
          .catch(err => {

            console.error(`${err}: This error was found in userTable`);

          });

        pool
          .query(tables.gifTable)
          .then(() => {
            console.log("gifTable created successfully");
          })
          .catch(err => {

            console.error(`${err}: This error was found in gifCommentTable`);

          });
        pool
          .query(tables.gifCommentTable)
          .then(() => {
            console.log("gifCommentTable created successfully");
          })
          .catch(err => {

            console.error(`${err}: This error was found in gifTable`);

          });

        pool
          .query(tables.articleTable)
          .then(() => {
            console.log("articleTable created successfully");
          })
          .catch(err => {

            console.error(
              `${err}: This error was found in articleCommentTable`
            );

          });

        pool
          .query(tables.articleCommentTable)
          .then(() => {

            console.log("articleTable created successfully");
          })
          .catch(err => {
            console.error(`${err}: This error was found in articleTable`);
            pool.end();

          });
      })
      .catch(err => {
        console.log(err);
        pool.end();
      });
  } catch (error) {
    console.log(`This is the catch error ${error} `);
  }
};

module.exports = dbCreate;
