import { Router } from "express";
import { acceptClip, appendRate, getClipThatNeedsToBeReviewed, rejectClip, streamClip } from "../controllers/clips.controller";

import upload from "../middleware/upload";
import catchError from "../utils/catchError";

const route = Router();

route.get("/:clipID", catchError(streamClip));
//@ts-ignore

route.get("/toBeReviewed", catchError(getClipThatNeedsToBeReviewed));
route.post("/:clipID/accept", catchError(acceptClip));
route.post("/:clipID/reject", catchError(rejectClip));
route.post("/:clipID/rate", appendRate);

export default route;
