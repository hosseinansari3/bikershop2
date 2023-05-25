const multer = require("multer");

const path = require("path");

const path1 = path.resolve("__dirname", "../client/public/images");
global.__basedir = __dirname;
const pathToFile = path.resolve(__dirname, "../public/images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("images", 4);
module.exports = upload;
