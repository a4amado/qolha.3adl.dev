import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import MimeType from "mime";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(process.cwd(), "files", "clips"));
  },
  filename: (req, file, callback) => {
    callback(null, v4());
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (MimeType.getExtension(file.mimetype) != "weba") {
      callback({
        message: "File Type is Not Allowed",
        name: "ext error",
      });
    } else {
      return callback(null, true);
    }
  },
});

export default upload;
