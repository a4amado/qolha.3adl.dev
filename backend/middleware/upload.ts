import convert from "convert";
import multer from "multer";
import path, { join } from "node:path";
import { randomUUID } from "node:crypto";
import { extension } from "mime-types";

// @ts-ignore
import FirebaseStorage from "multer-firebase-storage";
import { log } from "node:console";

// import * as FirebaseServiceAccount from "../../qolha-372817-firebase-adminsdk-3j4lx-dbd1d6cfa9.json";

// const FirebaseMulter = multer.diskStorage({
//     // @ts-ignore
//     storage: FirebaseStorage({
//         bucketName: "clip",
//         credentials: FirebaseServiceAccount,
//         unique: true,
//     }),
// });

log(join(process.cwd(), "files", "clips"));
const MULTER_Storage = multer.diskStorage({
    destination: (_req, _file, _callback) => _callback(null, join(process.cwd(), "files", "clips")),
    filename: (_req, _file, _callback) => _callback(null, randomUUID() + "." + extension(_file.mimetype)),
});

const upload = multer({
    storage: MULTER_Storage,
    limits: {
        fileSize: convert(20, "kilobytes").to("byte"),
    },
});

export default upload;
