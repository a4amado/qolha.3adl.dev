import { InternalException } from "../utils/exception";
import { Request, Response } from "express";

import Codes from "http-status-codes";
import { createReadStream } from "node:fs";
import getQueryItem from "../utils/getQueryItem";
import { join } from "node:path";
import prisma from "../utils/prismadb";
import { v4 } from "uuid";

export async function streamClip(req: Request, res: Response) {
    try {
        const clip = await prisma?.clip.findUniqueOrThrow({ where: { id: getQueryItem(req.query.clipID) } });

        const stream = createReadStream(join(process.cwd(), "files", "clips", clip?.path));

        stream.on("error", (error) => {
            return InternalException(res, error);
        });
        stream.pipe(res);
    } catch (error) {
        res.status(404).end();
    }
}
export async function getClipThatNeedsToBeReviewed(req: Request, res: Response) {
    try {
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
    } catch (error) {
        InternalException(res, error);
    }
}

export async function acceptClip(req: Request, res: Response) {
    try {
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
    } catch (error) {
        return InternalException(res, error);
    }
}

export async function rejectClip(req: Request, res: Response) {
    try {
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
    } catch (error) {
        return InternalException(res, error);
    }
}

export async function appendRate(req: Request, res: Response) {
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
    } catch (error) {}
}
