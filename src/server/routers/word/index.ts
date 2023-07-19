import { router } from "src/server/trpc";
import deleteWord from "./deleteWord";
import insertWord from "./insertWord";
import getWordThatNeedsClips from "./getWordThatNeedsClips";
import getWord from "./getWord";

const wordRouter = router({
    deleteWord: deleteWord,
    insertWord: insertWord,
    getWordThatNeedsClips: getWordThatNeedsClips,
    getWord: getWord,
});

export default wordRouter;
