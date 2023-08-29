import prisma from "@db";
import { publicProcedure } from "src/server/trpc";
import { string } from "yup";

const getWordThatNeedsClips = publicProcedure.input(string().uuid().optional()).query(async (opts) => {
    const where = opts.input
        ? {
              id: opts.input,
          }
        : {};

    const word = await prisma.word.findFirst({
        orderBy: {
            clips: {
                _count: "asc",
            },
        },
        where: where,
    });

    return word;
});

export default getWordThatNeedsClips;
