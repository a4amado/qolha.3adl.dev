import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import catchError from "../utils/catchError";

const route = Router();


route.post("/signUp", catchError(signUp));
route.post("/logIn", catchError(signIn));
route.post("/delete");

export default route;





/**
 * words /POST
 * words/:wordID /GET
 * words/:wordID/clip /POST
 * words/:wordID/clips /GET
 * words/getWordWithTheLeastClips /GET
 * 
 * 
 * 
 * users/:userID /GET
 * users/userID /POST
 * 
 * 
 * auth/signUP /POST
 * auth/loginIn /POST
 * auth/delete /DELETE
 * 
 * 
 * clips/:clipID /GET
 * clips/toBeReviewed /POST
 * clips/:clipID/accept /POST
 * clips/:clipID/reject /POST
 * clips/:clipID/rate /POST
 * 
 * 
 * hits/q /GET
 */
