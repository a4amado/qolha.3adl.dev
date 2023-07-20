import prisma from "@db";
import { adminProcedure, publicProcedure } from "src/server/trpc";

const getClipThatNeedsRevision = publicProcedure.query(async (opts) => {
    const clip = await prisma.clip.findMany({
        where: {
            accept: false,
        },
        select: {
            id: true,
            word: {
                select: {
                    ar: true,
                },
            },
            clipName: true,
            user: {
                select: {
                    name: true, image: true
                }
            }
        },
        take: 15
    });

 

    return { clips: clip };
});

export default getClipThatNeedsRevision;
