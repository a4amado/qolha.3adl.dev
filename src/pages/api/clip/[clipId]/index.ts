import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";
import butters from "a-promise-wrapper";
import prisma from "@db";
import Codes from "http-status-codes";
import validateZodSchema from "@backend/utils/validate.zod";
import { createReadStream } from "node:fs";
import { join } from "path";

const streamClip = z.object({
    query: z.object({
        clipId: z.string().uuid(),
    }),
});

const route = nextConnect();

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(streamClip, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    const clip = await butters(
        prisma.clip.findFirst({
            where: {
                id: Input.query.clipId,
            },
            select: {
                clipName: true,
                id: true,
            },
        })
    );
    if (clip.error) return res.status(Codes.INTERNAL_SERVER_ERROR).send(errors);

    if (!clip.data) return res.status(Codes.NOT_FOUND).send("clip Not Found");
    const stream = createReadStream(join(process.cwd(), "files", "clips", clip.data.clipName));

    stream.on("error", (error) => {
        return res.status(Codes.INTERNAL_SERVER_ERROR).send(errors);
    });
    stream.pipe(res);
});

export default route;
