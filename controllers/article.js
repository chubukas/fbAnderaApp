const { Pool } = require("pg");
require("dotenv");

const pool = new Pool({
  connectionString: process.env.DB_HOST
});

exports.createArticle = (req, res, next) => {
  let date = new Date();
  let inputs = [req.body.title, req.body.article];
  let query = `INSERT INTO article(title,article,postedBy,createdOn) VALUES ($1,$2,$3,$4) RETURNING *`;
  let input = [
    "making money",
    `authentication and
  authorization in given
  project.
  project.
  Creates custom and
  descriptive error
  messages.`,
    "Timothy Ben",
    date
  ];

  pool
    .query(query, input)
    .then(datas => {
      let date = `${datas.rows[0].createdon.toLocaleDateString()} ${datas.rows[0].createdon.toLocaleTimeString()}`;
      res.status(201).json({
        status: "Success",
        data: {
          message: "Article Created Successfully",
          articleID: datas.rows[0].id,
          createdOn: date,
          title: datas.rows[0].title
        }
      });
    })
    .catch(err => {
      res.status(404).json({ status: err, message: `Not Created` });
    });
};

// GET A ONE ARTICLE
exports.getArticles = (req, res, next) => {
  let paraId = Number.parseInt(req.params.id);
  let query = `SELECT * FROM article WHERE id = $1`;

  pool
    .query(query, [paraId])
    .then(datas => {
      let date = `${datas.rows[0].createdon.toLocaleDateString()} ${datas.rows[0].createdon.toLocaleTimeString()}`;
      res.status(200).json({
        status: "Success",
        data: {
          id: datas.rows[0].id,
          createdOn: date,
          title: datas.rows[0].title,
          article: datas.rows[0].article,
          comments: []
        }
      });
    })
    .catch(err => {
      res
        .status(404)
        .json({ status: `Error`, message: `Not Available`, paraId });
    });
};

// DELETE AN ARTICLE

exports.deleteArticle = (req, res, next) => {
  let paraId = Number.parseInt(req.params.id);
  let query = `DELETE FROM article a USING articlecomment ac WHERE a.id = $1  AND a.id = ac.id`;

  pool
    .query(query, [paraId])
    .then(datas => {
      if (datas.rowCount < 1) {
        res.status(404).json({
          status: "Not Available",
          data: { message: "No Such Articule is our Database" }
        });
      }
      res.status(200).json({
        status: "Success",
        data: { message: "Articule Deleted Successfully" }
      });
    })
    .catch(err => {});
};

exports.updateArticle = (req, res, next) => {
  let paraId = Number.parseInt(req.params.id);
  let query = ``;
};
