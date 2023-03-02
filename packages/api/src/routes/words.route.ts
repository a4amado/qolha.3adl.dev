import { Router } from "express";
import { appendWord, QueryWord, getWordWithTheLeastClips, listClipsForWord, appendClipToWord } from "../controllers/words.controller";

import upload from "../middleware/upload";
import catchError from "../utils/catchError";

const route = Router();

route.post("/", catchError(appendWord));
route.get("/:wordID", catchError(QueryWord));
route.get("/getWordWithTheLeastClips", catchError(getWordWithTheLeastClips));
route.get("/:wordID/clips", catchError(listClipsForWord));
route.post("/:wordID/clip", catchError(upload.single("clip")), catchError(appendClipToWord));
export default route;
