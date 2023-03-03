"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const mime_1 = __importDefault(require("mime"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path_1.default.join(process.cwd(), "files", "clips"));
    },
    filename: (req, file, callback) => {
        callback(null, (0, uuid_1.v4)() + "." + mime_1.default.getExtension(file.mimetype));
    },
});
const upload = (0, multer_1.default)({
    storage,
    // fileFilter: (req: Request, file, callback) => {
    //     if (MimeType.getExtension(file.mimetype) != "weba") {
    //         callback({
    //             message: "File Type is Not Allowed",
    //             name: "ext error",
    //         });
    //     } else {
    //         return callback(null, true);
    //     }
    // },
});
exports.default = upload;
