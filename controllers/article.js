const { Pool } = require("pg");
require("dotenv");

const pool = new Pool({
  connectionString: process.env.DB_HOST
});

// CREATE NEW ARTICLE
exports.createArticle = (req, res, next) => {
  let date = new Date();
  let query = `INSERT INTO article(title,article,postedBy,createdOn) VALUES ($1,$2,$3,$4) RETURNING *`;
  let input = [req.body.title, req.body.article, req.body.postedBy, date];
  req.setHeader("Authorization", "Bearer" + token);

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
  let query = `SELECT * FROM articleComment where articleid = $1`;
  req.setHeader("Authorization", "Bearer" + token);
  pool
    .query(query, [paraId])
    .then(datas => {
      if (datas.rowCount >= 1) {
        let query = `SELECT  a.id, a.createdon,a.title,a.article,ac.id, comment, ac.articleid FROM articleComment ac INNER JOIN article a ON  a.id = ac.articleid WHERE ac.articleid = $1`;

        pool
          .query(query, [paraId])
          .then(data => {
            let date = `${data.rows[0].createdon.toLocaleDateString()} ${data.rows[0].createdon.toLocaleTimeString()}`;
            res.status(200).json({
              status: "Success",
              data: {
                id: data.rows[0].id,
                createdOn: date,
                title: data.rows[0].title,
                article: data.rows[0].article,
                comments: data.rows
              }
            });
          })
          .catch(err => {
            res.send(err);
          });
      }

      let query = `SELECT * FROM article where id = $1`;

      pool
        .query(query, [paraId])
        .then(theData => {
          let date = `${theData.rows[0].createdon.toLocaleDateString()} ${theData.rows[0].createdon.toLocaleTimeString()}`;
          res.json({
            status: "Success",
            data: {
              id: theData.rows[0].id,
              createdOn: date,
              title: theData.rows[0].title,
              article: theData.rows[0].article,
              comments: [{ message: "No Comment For This Article" }]
            }
          });
        })
        .catch(err => {
          res.json({
            status: "Error",
            data: {
              massage: `We don't have this article in our database `
            }
          });
        });
    })
    .catch(err => {
      res.status(404).json({ status: `Error`, message: `Not Available` });
    });
};

// DELETE AN ARTICLE

exports.deleteArticle = (req, res, next) => {
  let paraId = Number.parseInt(req.params.id);
  let query = `DELETE FROM article WHERE id = $1`;
  req.setHeader("Authorization", "Bearer" + token);
  pool
    .query(query, [paraId])
    .then(datas => {
      if (datas.rowCount < 1) {
        res.status(404).json({
          status: "Not Available",
          data: { message: "No Such Article is our Database" }
        });
      }
      res.status(200).json({
        status: "Success",
        data: { message: "Article Deleted Successfully" }
      });
    })
    .catch(err => {});
};

// UPDATING ARTICLE

exports.updateArticle = (req, res, next) => {
  let query = `UPDATE article set title = $1 , article = $2 WHERE id = $3 RETURNING *`;
  let paraId = Number.parseInt(req.params.id);
  req.setHeader("Authorization", "Bearer" + token);
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
  req.setHeader("Authorization", "Bearer" + token);

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

// GET A ALL ARTICLE
exports.getAllArticles = (req, res, next) => {
  let query = `SELECT  id,createdon,title,article,id as authorid FROM article ORDER BY createdon`;
  req.setHeader("Authorization", "Bearer" + token);

  pool
    .query(query)
    .then(datas => {
      let date = `${datas.rows[0].createdon.toLocaleDateString()} ${datas.rows[0].createdon.toLocaleTimeString()}`;
      res.status(200).json({
        status: "Success",
        data: datas.rows
      });
    })
    .catch(err => {
      res
        .status(404)
        .json({ status: `${err}`, message: `Not Available`, paraId });
    });
};
