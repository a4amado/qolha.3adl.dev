import { Router } from "express";
import { signUp } from "../controllers/auth.controller";
import catchError from "../utils/catchError";

const route = Router();

route.post("/signUp", catchError(signUp) );
route.post("/logIn")
route.post("/delete")


export default route;