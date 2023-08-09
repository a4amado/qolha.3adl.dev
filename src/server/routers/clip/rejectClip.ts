import prisma from "@db";
import { Schema$Client$AcceptClip } from "@schema/clip/accept-clip";
import { adminProcedure } from "src/server/trpc";

const rejectClip = adminProcedure.input(Schema$Client$AcceptClip).mutation(async (opts) => {
    const deletedClip = await prisma.clip.delete({
        where: {
            id: opts.input.clipId,
        },
    });

    return deletedClip;
});

export default rejectClip;
