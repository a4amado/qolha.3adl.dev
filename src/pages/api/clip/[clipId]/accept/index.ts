import validateZodSchema from "@backend/utils/validate.zod";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";
import Codes from "http-status-codes";
import butters from "a-promise-wrapper";
import prisma from "@db";

const route = nextConnect();

const acceptClip = z.object({
    query: z.object({
        clipId: z.string().uuid(),
    }),
});

route.patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(acceptClip, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    const acceptedClip = await butters(
        prisma.clip.update({
            where: {
                id: Input.query.clipId,
            },
            data: {
                accept: true,
            },
        })
    );
    if (acceptedClip.error) return res.status(Codes.INTERNAL_SERVER_ERROR).end();
    res.status(Codes.OK).send(acceptedClip.data);
});

export default route;
