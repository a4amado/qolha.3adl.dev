import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

import convert from "convert";
import multer from "multer";
import { v4 } from "uuid";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { extension } from "mime-types";

// @ts-ignore
import FirebaseStorage from 'multer-firebase-storage';


import * as FirebaseServiceAccount from "../../qolha-372817-firebase-adminsdk-3j4lx-dbd1d6cfa9.json";

const FirebaseMulter = multer.diskStorage({
    // @ts-ignore
    storage: FirebaseStorage({
      bucketName: 'clip',
      credentials: {
        clientEmail: FirebaseServiceAccount.client_email,
        privateKey: FirebaseServiceAccount.private_key,
        projectId: FirebaseServiceAccount.project_id
      }
    })
  })


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
