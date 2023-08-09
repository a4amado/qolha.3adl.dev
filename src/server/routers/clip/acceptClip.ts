import prisma from "@db";
import { Schema$Client$AcceptClip } from "@schema/clip/accept-clip";
import { adminProcedure } from "src/server/trpc";

const AcceptClip = adminProcedure.input(Schema$Client$AcceptClip).mutation(async (opts) => {
    const acceptedClip = await prisma.clip.update({
        where: {
            id: opts.input.clipId,
        },
        data: {
            accept: true,
        },
    });

    return acceptedClip;
});

export default AcceptClip;
