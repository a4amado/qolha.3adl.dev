import { searchForUserWithEmailAddress, getUser, deleteUser } from "@backen/controllers/users.controller";
import Validate from "@backen/middleware/validate";
import verifyRole from "@backen/middleware/verifyRole";
import withAuth from "@backen/middleware/withAuth";
import catchError from "@backen/utils/catchError";
import { Router } from "express";

const routes = Router();

routes.get("/q", withAuth, verifyRole(["admin"]), Validate("searchForUserWithEmailAddress"), catchError(searchForUserWithEmailAddress));
routes.get("/:userID", Validate("getOrDeleteUser"), catchError(getUser));
routes.delete("/:userID", Validate("getOrDeleteUser"), catchError(deleteUser));

export default routes;
 