import prisma from "@db";
import { publicProcedure, router } from "src/server/trpc";
import { string } from "yup";

const searchRouter = router({
    searchWord: publicProcedure.input(string().required()).mutation(async () => {
        const ss = await prisma.word.findMany({
            orderBy: {
                clips: {
                    _count: "desc",
                },
            },

            include: {
                clips: {
                    select: {
                        _count: true,
                        id: true,
                    },
                },
            },
        });

        return ss;
    }),
});

export default searchRouter;
