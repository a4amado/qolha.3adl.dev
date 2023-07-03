import { randomUUID } from "node:crypto";
import { publicProcedure, router } from "src/server/trpc";

const searchRouter = router({
    searchWord: publicProcedure.query(async () => {
        return new Promise((reso) => {
            setTimeout(() => {
                return Array.from({ length: 10 }, () => ({
                    ar: "أنا",
                    id: randomUUID(),
                }));
            }, 3000);
        });
    }),
});

export default searchRouter;
