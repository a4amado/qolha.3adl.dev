import { router } from "src/server/trpc";
import insertRate from "./insertRate";

const rateRouter = router({
    insert: insertRate,
});

export default rateRouter;
