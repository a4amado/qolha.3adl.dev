import prisma from "@db";
import { Schema$Client$AcceptClip } from "@schema/clip/accept-clip";
import { TRPCError } from "@trpc/server";
import aPromiseWrapper from "a-promise-wrapper";
import { publicProcedure } from "src/server/trpc";

const AcceptClip = publicProcedure.input(Schema$Client$AcceptClip).mutation(async (opts) => {
    const acceptedClip = await aPromiseWrapper(
        prisma.clip.update({
            where: {
                id: opts.input.clipId,
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
