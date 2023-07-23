import { router } from "src/server/trpc";
import QueryUser from "./query-user";
import banUser from "./ban-user";
import deleteUser from "./delete-user";
import UnbanUser from "./unbanUser";

const userRouter = router({
    banUser: banUser,
    unBanUser: UnbanUser,
    query$user: router({
        QueryUserById: QueryUser.QueryUserById,
        QueryUserByEmail: QueryUser.QueryUserByEmail,
    }),
    deleteUser: deleteUser,
});

export default userRouter;
