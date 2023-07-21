import prisma from "@db";
import { publicProcedure, router } from "src/server/trpc";

const searchRouter = router({
    searchWord: publicProcedure.query(async () => {
        const ss = await prisma.word.findMany({
            where: {
                accepted: true,
            },
            include: {
                clips: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {
                clips: {
                    _count: "desc",
                },
            },
        });
        console.log(ss);

        return ss;
    }),
});

export default searchRouter;
