import prisma from "@db";
import { Schema$Client$InsertRate } from "@schema/rate/insert-rate";
import { publicProcedure } from "src/server/trpc";

const insertRate = publicProcedure.input(Schema$Client$InsertRate).query(async (opts) => {
    const clipRate = await prisma.rate.upsert({
        create: {
            clipId: opts.input.clipId,
            // @ts-ignore
            userId: req.session.id,
            // @ts-ignore

            rate: opts.input.query.rate,
        },
        update: {
            // @ts-ignore

            rate: opts.input.query.rate,
        },
        where: {
            clipId_userId: {
                // @ts-ignore

                clipId: opts.input.query.rate,
                // @ts-ignore
                userId: req.session.id,
            },
        },
    });

    return clipRate;
});

export default insertRate;
