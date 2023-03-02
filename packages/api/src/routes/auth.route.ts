import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import catchError from "../utils/catchError";

const route = Router();

route.post("/signUp", catchError(signUp));
route.post("/logIn", catchError(signIn));
route.post("/delete");

export default route;
