import prisma from "@db";
import { publicProcedure } from "src/server/trpc";

const getClipThatNeedsRevision = publicProcedure.query(async () => {
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
                    name: true,
                    image: true,
                    id: true,
                },
            },
        },
        take: 15,
    });

    const PendingClips = await prisma.clip.aggregate({
        where: {
            accept: false,
        },
        _count: {
            _all: true,
        },
    });

    return {
        clips: clip,
        PendingClips,
    };
});

export default getClipThatNeedsRevision;
