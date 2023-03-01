import { Router } from "express";
import { appendRate } from "../controllers/rate.controller";
const route = Router();


route.post("/:clipID", appendRate)


export default route;