import prisma from "@db";
import { Prisma } from "@prisma/client";
import { Schema$API$QueryClip } from "@schema/clip/query-clip";
import { TRPCError } from "@trpc/server";
import aPromiseWrapper from "a-promise-wrapper";
import { publicProcedure } from "src/server/trpc";

const QueryClip = publicProcedure.input(Schema$API$QueryClip).query(async (opts) => {
    
    const query: Prisma.ClipFindManyArgs = {};
    if (opts.input.query._userId) {
        query.where = {
            userId: opts.input.query._userId,
        };
    }
    if (opts.input.query._wordId) {
        query.where = {
            ...query.where,
            wordId: opts.input.query._wordId,
        };
    }
    if (opts.input.query._order) {
        query.take = opts.input.query._limit;
    }

    query.select = {};

    const clips = await aPromiseWrapper(prisma.clip.findMany(query));

    if (clips.error) {
        console.error(clips.error);

        return new TRPCError({
            code: "INTERNAL_SERVER_ERROR"
        })
    }

    return clips.data


})


export default QueryClip