const { Pool } = require("pg");
require("dotenv");

const pool = new Pool({
  connectionString: process.env.DB_HOST
});

exports.createArticle = (req, res, next) => {
  let date = new Date();
  let inputs = [req.body.title, req.body.article];
  let query = `INSERT INTO article(title,article,postedBy) VALUES ($1,$2,$3) RETURNING *`;
  let input = [
    "Good title",
    `Fails to implement
  authentication and
  authorization in given
  project.
  Successfully implements
  authentication and
  authorization in the
  project.
  Creates custom and
  descriptive error
  messages.`,
    "mark writer"
  ];

  pool
    .query(query, input)
    .then(datas => {
      res.status(201).json({
        status: "Success",
        data: {
          message: "Article Created Successfully",
          articleID: datas.rows[0].id,
          createdOn: datas.rows[0].createdOn,
          title: datas.rows[0].title
        }
      });
    })
    .catch(err => {
      res.status(404).json({ status: `${err}`, message: `Not Created` });
    });
};
