import validateZodSchema from "@backend/utils/validate.zod";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";
import Codes from "http-status-codes";
import butters from "a-promise-wrapper";
import prisma from "@db";

const route = nextConnect();

const deleteClip = z.object({
    query: z.object({
        clipId: z.string().uuid(),
    }),
});

route.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(deleteClip, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    const deletedClip = await butters(
        prisma.clip.delete({
            where: {
                id: Input.query.clipId,
            },
        })
    );
    if (deletedClip.error) return res.status(Codes.INTERNAL_SERVER_ERROR).end();
    res.status(Codes.OK).send(deletedClip.data);
});

export default route;
