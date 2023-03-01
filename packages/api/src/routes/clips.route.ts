import { Router } from "express";
import { acceptClip, appendClip, getClipThatNeedsToBeReviewed, listClipsForWord, rejectClip, streamClip } from "../controllers/clip.controller";
import upload from "../middleware/upload";

const route = Router();



route.get("/:wordID/list", listClipsForWord)
route.get("/toBeReviewed", getClipThatNeedsToBeReviewed)
route.get("/:clipID", streamClip)
//@ts-ignore
route.post("/:wordID/append", upload.single("clip"), appendClip);
route.post("/:clipID/accept", acceptClip);
route.post("/:clipID/reject", rejectClip);

export default route;
