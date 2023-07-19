import { randomUUID } from "node:crypto";
import { publicProcedure, router } from "src/server/trpc";

const searchRouter = router({
    searchWord: publicProcedure.query(async () => {
        return  Array.from({ length: 10 }, () => ({
            ar: "أنا",
            id: randomUUID(),
        }));
    }),
});

export default searchRouter;
