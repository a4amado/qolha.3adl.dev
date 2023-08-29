import prisma from "@db";
import { publicProcedure, router } from "src/server/trpc";
import { string } from "yup";

const searchRouter = router({
    searchWord: publicProcedure.input(string().required()).mutation(async (opts) => {
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
                        user: {
                            select: {
                                name: true,
                                id: true,
                                country: true,
                            },
                        },
                    },
                },
            },
            take: 5,
        });

        return {
            words: ss,
            word: opts.input,
        };
    }),
});

export default searchRouter;
