import prisma from "@db";
import { publicProcedure } from "src/server/trpc";

const getTop10Words4TheDay = publicProcedure.query(async (opts) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const wordPopularity = await prisma.wordPopularity.findMany({
        where: {
            date: {
                gte: yesterday,
                lt: today,
            },
        },
        include: {
            word: true,
        },
    });

    return wordPopularity;
});

export default getTop10Words4TheDay;
