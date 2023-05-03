import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";
import butters from "a-promise-wrapper";
import prisma from "@db";
import validateZodSchema from "@backend/utils/validate.zod";
import Codes from "http-status-codes";

const route = nextConnect();

const appendRate = z.object({
    query: z.object({
        clipId: z.string().uuid(),
        rate: z.preprocess((rate) => parseInt(z.string().parse(rate), 10), z.enum(["1", "50", "100"])),
    }),
});

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(appendRate, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    const clipRate = await butters(
        prisma.rate.upsert({
            create: {
                clipId: Input.query.clipId,
                // @ts-ignore
                userId: req.session.id,
                rate: Input.query.rate,
            },
            update: {
                rate: Input.query.rate,
            },
            where: {
                clipId_userId: {
                    clipId: Input.query.clipId,
                    // @ts-ignore
                    userId: req.session.id,
                },
            },
        })
    );
    if (clipRate.error) return res.status(Codes.INTERNAL_SERVER_ERROR).end();
    res.status(Codes.OK).send(clipRate);
});

export default route;
