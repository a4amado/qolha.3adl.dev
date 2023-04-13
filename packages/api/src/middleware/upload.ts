import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import convert from "convert";
import multer from "multer";
import { v4 } from "uuid";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { extension } from "mime-types";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const _Cloudinary_MULTER_Storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        public_id: (_req, _file) => v4() + ".weba",
        // @ts-ignore
        folder: "qolha-clips",
        // @ts-ignore
        format: async (_req, _file) => "weba", // supports promises as well
        resource_type: "raw",
    },
});

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
