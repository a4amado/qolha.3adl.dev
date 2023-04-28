import { signIn, signUp, verifyAccount } from "@backen/controllers/auth.controller";
import Validate from "@backen/middleware/validate";
import catchError from "@backen/utils/catchError";
import { Router } from "express";
const routes = Router()
routes.post("/signUp", Validate("signUp"), catchError(signUp));
routes.post("/logIn", Validate("signIn"), catchError(signIn));
routes.get("/account/:userID/code/:code", Validate("verifyAccount"), catchError(verifyAccount));
routes.delete("/account");

export default routes;