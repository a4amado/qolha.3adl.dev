import { Router } from "express";
import { queryHits } from "../controllers/q.controller";
import catchError from "../utils/catchError";

const route = Router();

route.get("/:q", catchError(queryHits));

export default route;
