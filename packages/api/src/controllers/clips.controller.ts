import { Request, Response } from "express";
import { z } from "zod";
import Codes from "http-status-codes";
import getQueryItem from "../utils/getQueryItem";
import { v4 } from "uuid";
import { join } from "node:path";
import prisma from "../utils/prismadb";
import { createReadStream } from "node:fs";

const streamClipSchema = z.object({
    clipID: z.string().uuid(),
});

export async function streamClip(req: Request, res: Response) {
    const clipCheck = streamClipSchema.safeParse(req.query);
    if (!clipCheck.success) {
        res.status(Codes.BAD_REQUEST).json(Codes.getStatusText(Codes.BAD_REQUEST));
        return;
    }
    const clip = await prisma?.clip.findUnique({ where: { id: getQueryItem(req.query.clipID) } });
    if (!clip?.id) throw "Clip Not Found";
    const stream = createReadStream(join(process.cwd(), "files", "clips", clip?.path));
    stream.on("error", (error) => {
        return res.status(Codes.BAD_REQUEST).send(error);
    });
    stream.pipe(res);
}
export async function getClipThatNeedsToBeReviewed(req: Request, res: Response) {
    const clips = await prisma?.clip.findMany({
        where: {
            accepted: false,
            rejected: false,
        },
        select: {
            word: {
                select: {
                    ar: true,
                    id: true,
                },
            },
            id: true,
            path: true,
        },
        take: 5,
    });

    res.status(Codes.OK).json(clips);
}

const acceptClipSchema = z.object({
    clipID: z.string().uuid(),
});

export async function acceptClip(req: Request, res: Response) {
    const acceptClipSchemaResult = acceptClipSchema.safeParse(req.query);

    if (!acceptClipSchemaResult.success) {
        return res.status(Codes.BAD_REQUEST).json(Codes.getStatusText(Codes.BAD_REQUEST));
    }
    const clipStatus = await prisma?.clip.update({
        where: {
            id: getQueryItem(req.query.clipID),
        },
        data: {
            accepted: true,
            rejected: false,
        },
    });
    return res.status(Codes.OK).json(clipStatus);
}

export async function rejectClip(req: Request, res: Response) {
    const acceptClipSchemaResult = acceptClipSchema.safeParse(req.query);

    if (!acceptClipSchemaResult.success) {
        return res.status(Codes.BAD_REQUEST).json(Codes.getStatusText(Codes.BAD_REQUEST));
    }
    const clipStatus = await prisma?.clip.update({
        where: {
            id: getQueryItem(req.query.clipID),
        },
        data: {
            accepted: false,
            rejected: true,
        },
    });
    return res.status(Codes.OK).json(clipStatus);
}

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
}
