require("dotenv").config();
const cloudiary = require("cloudinary");

cloudiary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });

exports.uploads = file => {
  return new Promise(
    resolve => {
      cloudiary.v2.uploader.upload(file, {}, (err, result) => {
        resolve({ url: result.url, id: result.public_id });
        console.log(result.url);
      });
    },
    reject => {
      reject({ message: "Could not Connect" });
    }
  );
};
