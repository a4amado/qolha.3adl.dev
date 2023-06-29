import prisma from "@db";
import { Prisma } from "@prisma/client";
import { Schema$API$AcceptClip } from "@schema/clip/accept-clip";
import { Schema$API$QueryClip } from "@schema/clip/query-clip";
import { TRPCError } from "@trpc/server";
import aPromiseWrapper from "a-promise-wrapper";
import { publicProcedure } from "src/server/trpc";

const rejectClip = publicProcedure.input(Schema$API$AcceptClip).mutation(async (opts) => {
    const deletedClip = await prisma.clip.delete({
        where: {
            id: opts.input.query.clipId,
        },
    });

    return deletedClip;
});

export default rejectClip;
