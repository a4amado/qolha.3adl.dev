import { Router } from "express";
import { deleteUser, getUser } from "../controllers/users.controller";
import catchError from "../utils/catchError";

const route = Router();



route.get("/:userID", catchError(getUser));
route.delete("/:userID", catchError(deleteUser));

export default route;
