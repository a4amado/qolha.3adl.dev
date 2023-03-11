import { Router } from "express";
import multer from "multer";
import { appendWord, QueryWord, getWordWithTheLeastClips, listClipsForWord, appendClipToWord } from "../controllers/words.controller";

import upload from "../middleware/upload";
import catchError from "../utils/catchError";

const route = Router();


route.post("/", catchError(appendWord));
route.get("/getWordWithTheLeastClips", catchError(getWordWithTheLeastClips));

route.get("/:wordID", catchError(QueryWord));

//catchError(appendClipToWord)
route.post("/:wordID/clip",function uploadFile(req, res, next) {
    const uploads = upload.single('clip');

    uploads(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log(err);
            
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log(err);
        }
        // Everything went fine. 
        next()
    })
}, (req, res) => {
    // @ts-ignore
    res.status(200).send(req.file)
});

route.get("/:wordID/clips", catchError(listClipsForWord));
export default route;
