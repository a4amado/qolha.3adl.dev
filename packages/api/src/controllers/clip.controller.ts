import { Request, Response } from "express"
import { z } from "zod";
import Codes from "http-status-codes";
import getQueryItem from "../utils/getQueryItem";
import { v4 } from "uuid";
import { join } from "node:path";
import prisma from "../utils/prismadb"
import { createReadStream } from "node:fs";

const listClipsSchema = z.object({
    wordID: z.string().uuid(),
});


export async function listClipsForWord(req: Request, res: Response) {
    const ChecklistClipsSchema = listClipsSchema.safeParse(req);

    if (!ChecklistClipsSchema.success) {
        res.status(Codes.NOT_ACCEPTABLE).json(ChecklistClipsSchema.error.errors);
        return;
    }

    const clips = await prisma?.word.findFirst({
        where: {
            id: getQueryItem(req.query.wordID),
        },
        select: {
            ar: true,

            clips: {
                select: {
                    createBy: {
                        select: {
                            name: true,
                        },
                    },
                    id: true,
                    path: true,
                },
                take: 15,
            },
        },
    });

    res.status(Codes.OK).send(clips);
};



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


interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export async function appendClip(req: Request & { file: File }, res: Response) {
    try {
        const word = await prisma?.clip.create({
            data: {
                path: req.file.filename,
                // @ts-ignore
                userID: req.session.id,
                wordID: getQueryItem(req.body.wordID),
                id: v4(),
            },
        });

        return res.status(Codes.OK).json(word);
    } catch (error) {
        return res.status(Codes.INTERNAL_SERVER_ERROR).send(error);
    }
};

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



const streamClipSchema = z.object({
    clipID: z.string().uuid(),
});



export async function streamClip(req: Request, res: Response) {
    const clipCheck = streamClipSchema.safeParse(req.query);
    if (!clipCheck.success) {
        res.status(Codes.BAD_REQUEST).json(Codes.getStatusText(Codes.BAD_REQUEST));
        return;
    }
    const clip = await prisma?.clip.findUnique({ where: { id: getQueryItem(req.query.clipID) } })
    if (!clip?.id) throw "Clip Not Found"
    const stream = createReadStream(join(process.cwd(), "files", "clips", clip?.path));
    stream.on("error", (error) => {
        return res.status(Codes.BAD_REQUEST).send(error);

    });
    stream.pipe(res);
}
