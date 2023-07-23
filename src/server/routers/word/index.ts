import { router } from "src/server/trpc";
import deleteWord from "./deleteWord";
import insertWord from "./insertWord";
import getWordThatNeedsClips from "./getWordThatNeedsClips";
import getWord from "./getWord";
import getTop10Words4TheDay from "./getTop10Words4TheDay";

const wordRouter = router({
    deleteWord: deleteWord,
    insertWord: insertWord,
    getWordThatNeedsClips: getWordThatNeedsClips,
    getWord: getWord,
    getTop10Words4TheDay: getTop10Words4TheDay,
});

export default wordRouter;
