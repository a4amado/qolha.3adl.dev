import { Router } from "express";
import { acceptClip, appendClip, getClipThatNeedsToBeReviewed, listClipsForWord, rejectClip, streamClip } from "../controllers/clip.controller";
import upload from "../middleware/upload";
import catchError from "../utils/catchError";

const route = Router();



route.get("/:wordID/list", catchError(listClipsForWord))
route.get("/toBeReviewed", catchError(getClipThatNeedsToBeReviewed))
route.get("/:clipID", catchError(streamClip))
//@ts-ignore
route.post("/:wordID/append", catchError(upload.single("clip"), appendClip));
route.post("/:clipID/accept", catchError(acceptClip));
route.post("/:clipID/reject", catchError(rejectClip));

export default route;
