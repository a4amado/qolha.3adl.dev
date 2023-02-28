import {Router} from "express";
import { appendWord, getWordWithTheLeastClips, QueryWord } from "../controllers/word";

const router = Router();

router.get("/word/:wordID", QueryWord)
router.post("/word/append", appendWord)
router.get("/word/getWordWithTheLeastClips", getWordWithTheLeastClips)



export default router;