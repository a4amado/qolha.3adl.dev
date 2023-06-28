import { router } from "src/server/trpc";
import QueryUser from "./query-user";

const userRouter = router({
    query$user: QueryUser,
});

export default userRouter;
