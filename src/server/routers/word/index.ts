import { router } from "src/server/trpc";
import deleteWord from "./deleteWord";
import insertWord from "./insertWord";
import queryWord from "./queryWord";

const wordRouter = router({
    deleteWord: deleteWord,
    insertWord: insertWord,
    queryWord: queryWord,
});

export default wordRouter;
