const { Pool } = require("pg");
const cloud = require("../middlewares/cloudinaryConfig");
const pool = new Pool({
  connectionString: process.env.DB_HOST
});

exports.createGif = (req, res, next) => {
  const imageDetails = {
    image: req.file.path,
    imageTitle: req.body.title,
    imageid: ""
  };
  cloud
    .uploads(imageDetails.image)
    .then(result => {
      const image = result.url;
      const imageTitle = imageDetails.imageTitle;
      const imageid = result.id;

      const date = new Date();
      const query = `INSERT INTO gifs(image,title,createdon) VALUES ($1,$2,$3) RETURNING *`;

      pool
        .query(query, [image, imageTitle, date])
        .then(datas => {
          res.status(201).json({
            status: "Success",
            data: {
              gifId: datas.rows[0].id,
              message: "GIF image successfully posted”",
              createdOn: `${datas.rows[0].createdon.toLocaleDateString()} ${datas.rows[0].createdon.toLocaleTimeString()}`,
              title: datas.rows[0].title,
              imageUrl: datas.rows[0].image
            }
          });
        })
        .catch(err => {
          res.status(499).json({ err: `${err}` });
        });
    })
    .catch(err => {
      res.status(502).json({ err: `${err}` });
    });
};
// DELETE GIF
exports.deleteGif = (req, res, next) => {
  let paraId = Number.parseInt(req.params.id);
  let query = `DELETE FROM gifs WHERE id = $1`;

  pool
    .query(query, [paraId])
    .then(datas => {
      if (datas.rowCount < 1) {
        res.status(404).json({
          status: "Not Available",
          data: { message: "No Such gif is our Database" }
        });
      }
      res.status(200).json({
        status: "Success",
        data: { message: "gif Deleted Successfully" }
      });
    })
    .catch(err => {});
};

// POSTING COMMENT

exports.postGifComment = (req, res, next) => {
  let gifID = req.params.gifid;
  let comment = req.body.comment;
  let data = new Date();
  let query = `INSERT INTO gifComment (comment, createdon, gifid) VALUES ($1, $2, (SELECT id FROM gifs WHERE id = $3)) RETURNING *`;

  pool
    .query(query, [comment, data, gifID])
    .then(datas => {
      res.status(201).json({
        status: "success",
        data: {
          message: "Comment successfully created",
          createdOn: `${datas.rows[0].createdon.toLocaleDateString()} ${datas.rows[0].createdon.toLocaleTimeString()}`,
          gifTitle: datas.rows[0].title,
          comment: datas.rows[0].comment
        }
      });
    })
    .catch(err => {
      res.status(404).json({ err: `${err}` });
    });
};

// GET A ONE GIF
exports.getGif = (req, res, next) => {
  let paraId = Number.parseInt(req.params.gifid);
  let query = `SELECT * FROM gifComment where gifid = $1`;
  pool
    .query(query, [paraId])
    .then(datas => {
      if (datas.rowCount >= 1) {
        let query = `SELECT  g.id, g.createdon,g.title,g.image,gc.id, comment, gc.gifid FROM gifComment gc INNER JOIN gifs g ON  g.id = gc.gifid WHERE gc.gifid = $1`;

        pool
          .query(query, [paraId])
          .then(data => {
            let date = `${data.rows[0].createdon.toLocaleDateString()} ${data.rows[0].createdon.toLocaleTimeString()}`;
            res.status(200).json({
              status: "Success",
              data: {
                id: datas.rows[0].id,
                createdOn: date,
                title: datas.rows[0].title,
                imageUrl: datas.rows[0].image,
                comments: datas.rows
              }
            });
          })
          .catch(err => {
            res.send(err);
          });
      }
      let query = `SELECT * FROM gifs where id = $1`;

      pool
        .query(query, [paraId])
        .then(theData => {
          let date = `${theData.rows[0].createdon.toLocaleDateString()} ${theData.rows[0].createdon.toLocaleTimeString()}`;
          res.json({
            status: "Success",
            data: {
              id: datas.rows[0].id,
              createdOn: date,
              title: datas.rows[0].title,
              imageUrl: datas.rows[0].image,
              comments: [{ message: "No Comment For This Gif" }]
            }
          });
        })
        .catch(err => {
          res.json({
            massage: `We don't have this Gif in our database `,
            Error: err
          });
        });
    })
    .catch(err => {
      res.status(404).json({ status: `${err}`, message: `Not Available` });
    });
};

// GET  ALL GIFs
exports.getAllGifs = (req, res, next) => {
  let query = `SELECT  id,createdon,title,image as url,id as authorid FROM gifs ORDER BY createdon`;

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
