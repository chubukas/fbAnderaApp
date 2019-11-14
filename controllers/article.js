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
  // let query = `SELECT a.title,a.id,a.createdon,a.article,ac.* FROM article a,articleComment ac  WHERE ac.articleid = $1  `;
  let query = `SELECT a.title,a.id,a.createdon,a.article,ac.id,ac.comment,ac.articleid FROM article a,articleComment ac INNER JOIN articleComment  ON ac.articleid  = $1  `;

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
          comments: datas.rows
        }
      });
    })
    .catch(err => {
      res
        .status(404)
        .json({ status: `${err}`, message: `Not Available`, paraId });
    });
};

// DELETE AN ARTICLE

exports.deleteArticle = (req, res, next) => {
  let paraId = Number.parseInt(req.params.id);
  let query = `DELETE FROM article WHERE id = $1`;

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

// UPDATING ARTICLE

exports.updateArticle = (req, res, next) => {
  let query = `UPDATE article set title = $1 , article = $2 WHERE id = $3 RETURNING *`;
  let paraId = Number.parseInt(req.params.id);

  pool
    .query(query, [req.body.title, req.body.article, req.params.id])
    .then(datas => {
      res.status(200).json({
        status: "Successfully",
        data: {
          message: "Article successfully updated",
          title: datas.rows[0].title,
          article: datas.rows[0].article
        }
      });
    })
    .catch(err => {
      res.status(404).json({ error: `${err}` });
    });
};

// POSTING COMMENT

exports.postComment = (req, res, next) => {
  let artculeID = req.params.artculeid;
  let comment = req.body.comment;
  let data = new Date();
  let query = `INSERT INTO articleComment (comment, createdon, articleid) VALUES ($1, $2, (SELECT id FROM article WHERE id = $3)) RETURNING *`;

  pool
    .query(query, [comment, data, artculeID])
    .then(datas => {
      res.status(201).json({
        status: "success",
        data: {
          message: "Comment successfully created",
          createdOn: `${datas.rows[0].createdon.toLocaleDateString()} ${datas.rows[0].createdon.toLocaleTimeString()}`,
          articleTitle: datas.rows[0].title,
          article: datas.rows[0].article,
          comment: datas.rows[0].comment
        }
      });
    })
    .catch(err => {
      res.status(404).json({ err: `${err}` });
    });
};
