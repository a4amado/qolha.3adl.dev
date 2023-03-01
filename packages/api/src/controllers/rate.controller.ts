
import { Request, Response } from "express";
import { z } from "zod";
import Codes from "http-status-codes";
import getQueryItem from "../utils/getQueryItem";
import { v4 } from "uuid";


const appendRateSchema = z.object({
    query: z.object({
        clipID: z.string().uuid(),
    }),
    body: z.object({
        rate: z.enum(["0", "50", "100"]),
    }),
});



export async function appendRate(req: Request, res: Response) {
    const CheckAppendRateSchema = appendRateSchema.safeParse(req);

    if (!CheckAppendRateSchema.success) {
        res.status(Codes.BAD_REQUEST).json(CheckAppendRateSchema.error);
        return;
    }

    try {
        const clipRate = await prisma?.rate.findFirst({
            where: {
                AND: {
                    clipID: getQueryItem(req.query.clipID),
                    // @ts-ignore
                    userID: req.session.id,
                },
            },
        });

        const newClipRate = await prisma?.rate.upsert({
            create: {
                clipID: getQueryItem(req.query.clipID),
                // @ts-ignore
                userID: req.session.id,
                rate: Number(getQueryItem(req.body.rate)),
                id: v4(),
            },
            update: {
                rate: Number(getQueryItem(req.body.rate)),
            },
            where: {
                id: clipRate?.id || "",
            },
        });

    } catch (error) {
        return res.status(Codes.BAD_REQUEST).json(error);
    }
}
