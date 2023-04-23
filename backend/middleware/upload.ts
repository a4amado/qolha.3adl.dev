import convert from "convert";
import multer from "multer";
import path, { join } from "node:path";
import { randomUUID } from "node:crypto";
import { extension } from "mime-types";

// @ts-ignore
import FirebaseStorage from 'multer-firebase-storage';


import { readFile } from "fs"

const FirebaseServiceAccount = readFile(path.join(__dirname, "..", "..", "qolha-372817-firebase-adminsdk-3j4lx-dbd1d6cfa9.json"), "utf-8")



const FirebaseMulter = multer.diskStorage({
    // @ts-ignore
    storage: FirebaseStorage({
      bucketName: 'clip',
      credentials: FirebaseServiceAccount,
      unique: true
    })
  })


const MULTER_Storage = multer.diskStorage({
    destination: (_req, _file, _callback) => _callback(null, join(process.cwd(), "files", "clips")),
    filename: (_req, _file, _callback) => _callback(null, randomUUID() + "." + extension(_file.mimetype)),
});

const upload = multer({
    storage: FirebaseMulter,
    limits: {
        fileSize: convert(20, "kilobytes").to("byte"),
    },
});

export default upload;