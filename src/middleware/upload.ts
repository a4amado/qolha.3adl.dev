import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import MimeType from "mime";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(process.cwd(), "files", "clips"));
  },
  filename: (req, file, callback) => {
    callback(null, `${v4()}.${MimeType.getExtension(file.mimetype)}`);
  },

});

const upload = multer({ storage, fileFilter: (...rest) => {
  if (MimeType.getExtension(rest[1].mimetype) != "weba") {
    rest[2](true);
  }
}});

export default upload;
