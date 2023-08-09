import prisma from "@db";
import { publicProcedure } from "src/server/trpc";

const getTop10Words4TheDay = publicProcedure.query(async () => {
    const today = new Date();

    const top10WordsToday = await prisma.wordPopularity.groupBy({
        by: ["wordId"], // Group by wordId and word
        where: {
            date: {
                gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
            },
        },
        orderBy: {
            _count: {
                wordId: "desc", // Order by count of wordId in descending order
            },
        },
        take: 15, // Get the top 10 most searched words
        _count: {
            wordId: true, // Include the count of each wordId
        },
    });

    const w = await prisma.word.findMany({
        where: {
            id: {
                in: top10WordsToday.map((e) => e.wordId),
            },
        },
    });

    return w;
});

export default getTop10Words4TheDay;
