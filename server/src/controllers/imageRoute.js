let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
const multer = require("multer");
const path = require('path');
const fs = require('fs');

module.exports = function (app: Object) {

    const handleError = (err, res) => {
      res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
    };

    const upload = multer({
      dest: "./images"
    });


    app.post(
      "/upload",
      upload.single("avatar"),
      (req, res) => {
        console.log(req.file)
        const tempPath = req.file.path;

        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
          const targetPath = path.join(__dirname, "../../images/" + (req.file.filename)+".png");
          console.log("png")
          fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            res.status(200)
            res.json(req.file.filename+".png")
          });
        } else if (path.extname(req.file.originalname).toLowerCase() === ".jpg"){
          const targetPath = path.join(__dirname, "../../images/" + (req.file.filename)+".jpg");
          console.log("jpg")
          fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            res.status(200)
            res.json(req.file.filename+".jpg")
          });
        } else if (path.extname(req.file.originalname).toLowerCase() === ".jpeg"){
          const targetPath = path.join(__dirname, "../../images/" + (req.file.filename)+".jpeg");
          console.log("jpeg")
          fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            res.status(200)
            res.json(req.file.filename+".jpeg")
          });
        } else {
          fs.unlink(tempPath, err => {
            console.log("Not image")
            res
              .status(403)
              .contentType("text/plain")
              .end("Only .png files are allowed!");
          });
        }
      }
    );

    app.get("/image/:imagePath", (req, res) => {
      res.sendFile(path.join(__dirname, "../../images/"+req.params.imagePath));
    });
};
