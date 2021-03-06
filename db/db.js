const { Pool } = require("pg");

const tables = require("./tables");



require("dotenv").config();




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
            console.log("articleCommentTable created successfully");
          })
          .catch(err => {
            console.log(err);
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
