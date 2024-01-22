import multer from "multer";
import path from "path";

const maxSize = 5242880;

const storageEngine = multer.diskStorage({
  destination: "./public/assets/img",
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.split(" ").join("_")}`);
  },
});

const upload = multer({
  storage: storageEngine,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: (_, file, cb) => {
    checkFileType(file, cb);
  },
});

const checkFileType = (file, cb) => {

  const fileTypes = /jpg|png|jpeg|gif|webp|svg/;

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb("file format not supported");
  }
};

export default upload;
