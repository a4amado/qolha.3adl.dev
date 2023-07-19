import prisma from "@db";
import { publicProcedure } from "src/server/trpc";

const getWordThatNeedsClips = publicProcedure.query(async (opts) => {
    const word = await prisma.word.findFirst({
        orderBy: {
            clips: {
                _count: "asc",
            },
        },
    });

    return word;
});

export default getWordThatNeedsClips;
