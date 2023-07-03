import prisma from "@db";
import { Prisma } from "@prisma/client";
import { Schema$Client$QueryClip } from "@schema/clip/query-clip";
import { publicProcedure } from "src/server/trpc";

const queryClip = publicProcedure.input(Schema$Client$QueryClip).query(async (opts) => {
    const query: Prisma.ClipFindManyArgs = {};
    if (opts.input._userId) {
        query.where = {
            userId: opts.input._userId,
        };
    }
    if (opts.input._wordId) {
        query.where = {
            ...query.where,
            wordId: opts.input._wordId,
        };
    }
    if (opts.input._order) {
        query.take = opts.input._limit;
    }

    query.select = {};

    const clips = await prisma.clip.findMany(query);

    return clips;
});

export default queryClip;
