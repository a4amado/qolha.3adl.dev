import {Router} from "express";
import { appendWord, getWordWithTheLeastClips, QueryWord } from "../controllers/word.controller";
import catchError from "../utils/catchError";

const router = Router();

router.get("/:wordID", catchError(QueryWord))
router.post("/append", catchError(appendWord))
router.get("/getWordWithTheLeastClips", catchError(getWordWithTheLeastClips))



export default router;