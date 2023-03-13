import { NextFunction, Router } from "express";
import { QueryWord, appendClipToWord, appendWord, getWordWithTheLeastClips, listClipsForWord } from "./controllers/words.controller";
import { acceptClip, appendRate, getClipThatNeedsToBeReviewed, rejectClip, streamClip } from "./controllers/clips.controller";
import { deleteUser, getUser } from "./controllers/users.controller";
import { signIn, signUp } from "./controllers/auth.controller";

import Validate from "./middleware/validate";
import catchError from "./utils/catchError";
import { queryHits } from "./controllers/q.controller";
import upload from "./middleware/upload";


const routes = Router()
/**
 * Auth Routes
 */
routes.get("/auth/signUp", Validate("signUp"), catchError(signUp))
routes.post("/auth/logIn", Validate("signIn"), catchError(signIn));
routes.delete("/auth/account");

/**
 * Words Routes
 */
routes.post("/words/word",  Validate("appendWord") ,catchError(appendWord));
routes.get("/words/getWordWithTheLeastClips", catchError(getWordWithTheLeastClips));
routes.get("/words/:wordID",Validate("QueryWord") ,catchError(QueryWord));
routes.get("/words/:wordID/clips", Validate("listClipsForWord"), catchError(listClipsForWord));
routes.post("/words/:wordID/clip",upload.single('clip'), Validate("appendClipToWord"), appendClipToWord)


/**
 * Users Routes
 */
routes.get("/users/:userID", Validate("getOrDeleteUser"),catchError(getUser));
routes.delete("/users/:userID", Validate("getOrDeleteUser"),catchError(deleteUser));


/**
 * Clips Routes
 */
routes.get("/clips/toBeReviewed", catchError(getClipThatNeedsToBeReviewed));
routes.get("/clips/:clipID", Validate("getOrDeleteClip") ,catchError(streamClip));
routes.post("/clips/:clipID/accept", Validate("acceptOrRejectClip"),catchError(acceptClip));
routes.post("/clips/:clipID/reject", Validate("acceptOrRejectClip"), catchError(rejectClip));
routes.post("/clips/:clipID/rate", Validate("appendRate") ,catchError(appendRate));

/**
 * Hits Route
 */
routes.get("/:q", catchError(queryHits));


export default routes