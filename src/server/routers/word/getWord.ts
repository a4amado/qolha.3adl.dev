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
            },
        },
    });
    return Word;
});

export default getWord;
