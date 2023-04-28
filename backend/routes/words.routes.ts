import { appendWord, getWordWithTheLeastClips, skipWord, QueryWord, listClipsForWord, appendClipToWord } from "@backen/controllers/words.controller";
import upload from "@backen/middleware/upload";
import Validate from "@backen/middleware/validate";
import verifyRole from "@backen/middleware/verifyRole";
import withAuth from "@backen/middleware/withAuth";
import catchError from "@backen/utils/catchError";

import { Router } from "express";

const routes = Router()

routes.post("/word", Validate("appendWord"), catchError(appendWord));
routes.get("/getWordWithTheLeastClips", catchError(getWordWithTheLeastClips));
routes.post("/:wordID/skip", withAuth, Validate("skipWord"), catchError(skipWord));
routes.get("/:wordID", Validate("QueryWord"), catchError(QueryWord));

routes.get("/:wordID/clips", Validate("listClipsForWord"), catchError(listClipsForWord));
routes.post("/:wordID/clip", withAuth, verifyRole(["admin"]), upload.single("clip"), Validate("appendClipToWord"), appendClipToWord);



export default routes;