import { getClipThatNeedsToBeReviewed, streamClip, acceptClip, rejectClip, appendRate } from "@backen/controllers/clips.controller";
import Validate from "@backen/middleware/validate";
import verifyRole from "@backen/middleware/verifyRole";
import withAuth from "@backen/middleware/withAuth";
import catchError from "@backen/utils/catchError";
import { Router } from "express";

const routes = Router();




routes.get("/toBeReviewed", catchError(getClipThatNeedsToBeReviewed));
routes.get("/:clipID", Validate("getOrDeleteClip"), catchError(streamClip));
routes.post("/:clipID/accept", Validate("acceptOrRejectClip"), withAuth, verifyRole(["admin"]), catchError(acceptClip));
routes.post("/:clipID/reject", Validate("acceptOrRejectClip"), withAuth, verifyRole(["admin"]), catchError(rejectClip));
routes.post("/:clipID/rate", Validate("appendRate"), withAuth, catchError(appendRate));


export default routes;