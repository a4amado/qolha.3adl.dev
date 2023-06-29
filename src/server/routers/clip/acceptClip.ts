import prisma from "@db";
import { Prisma } from "@prisma/client";
import { Schema$API$AcceptClip } from "@schema/clip/accept-clip";
import { Schema$API$QueryClip } from "@schema/clip/query-clip";
import { TRPCError } from "@trpc/server";
import aPromiseWrapper from "a-promise-wrapper";
import { publicProcedure } from "src/server/trpc";

const AcceptClip = publicProcedure.input(Schema$API$AcceptClip).mutation(async (opts) => {
    const acceptedClip = await aPromiseWrapper(
        prisma.clip.update({
            where: {
                id: opts.input.query.clipId,
            },
            data: {
                accept: true,
            },
        })
    );
    if (acceptedClip.error) {
        return new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
        });
    }

    return acceptedClip.data;
});

export default AcceptClip;
