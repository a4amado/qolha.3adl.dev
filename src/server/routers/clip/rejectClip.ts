import prisma from "@db";
import { Prisma } from "@prisma/client";
import { Schema$Client$AcceptClip } from "@schema/clip/accept-clip";

import { TRPCError } from "@trpc/server";
import aPromiseWrapper from "a-promise-wrapper";
import { publicProcedure } from "src/server/trpc";

const rejectClip = publicProcedure.input(Schema$Client$AcceptClip).mutation(async (opts) => {
    const deletedClip = await prisma.clip.delete({
        where: {
            id: opts.input.clipId,
        },
    });

    return deletedClip;
});

export default rejectClip;
