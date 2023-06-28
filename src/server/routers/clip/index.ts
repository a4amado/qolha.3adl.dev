import { router } from "src/server/trpc";
import QueryClip from "./queryClip";

const clipRouter = router({
    query: QueryClip
})


export default clipRouter;