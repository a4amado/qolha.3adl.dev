import {Router} from "express";
import { appendWord, getWordWithTheLeastClips, QueryWord } from "../controllers/word.controller";

const router = Router();

router.get("/:wordID", QueryWord)
router.post("/append", appendWord)
router.get("/getWordWithTheLeastClips", getWordWithTheLeastClips)



export default router;