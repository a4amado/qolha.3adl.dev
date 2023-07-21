import prisma from "@db";
import { publicProcedure } from "src/server/trpc";
import { string } from "yup";

const getWord = publicProcedure.input(string().required().uuid()).query(async (opts) => {
    const Word = await prisma.word.findFirst({
        where: {
            id: opts.input,
        },
        include: {
            clips: {
                take: 10,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            role: true,
                            country: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
    return Word;
});

export default getWord;
