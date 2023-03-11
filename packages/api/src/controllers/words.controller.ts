import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import prisma from "../utils/prismadb";
import Codes from "http-status-codes";
import getQueryItem from "../utils/getQueryItem";
import { Field } from "multer";
import { v4 } from "uuid";
const QueryWordSchema = z.object({
    wordID: z.string().uuid("Invalid wordID"),
});

const appendWordSchema = z.object({
    word: z.string(),
});

export async function QueryWord(req: Request, res: Response) {
    const s = QueryWordSchema.safeParse(req.query);
    if (!s.success) return res.status(Codes.UNPROCESSABLE_ENTITY).send(s.error.errors);
    const word = await prisma.word.findFirst({
        where: {
            id: getQueryItem(req.query.wordID),
        },
    });
    return res.status(Codes.OK).send(word);
}

export async function appendWord(req: Request, res: Response) {
    const checkAppendWord = appendWordSchema.safeParse(req.query);
    if (!checkAppendWord.success) return res.status(Codes.BAD_REQUEST).json(checkAppendWord.error.errors);

    const word = await prisma?.word.create({
        data: {
            ar: getQueryItem(req.query.word),
            // @ts-ignore
            userId: req?.session?.id,
            id: v4(),
        },
    });
    return res.status(Codes.OK).send(word);
}

export async function getWordWithTheLeastClips(req: Request, res: Response) {
    // const word = await prisma?.word.findFirst({
    //     select: {
    //         ar: true,
    //         id: true,
    //         createBy: { select: { name: true, id: true } },
    //     },
    //     orderBy: {
    //         clips: {
    //             _count: "asc",
    //         },
    //     },
    //     take: 1,
    // });

    return res.json({
        ar: "true",
        id: "true",
        createBy: { select: { name: "true", id: "true" } },
    });
}

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
}

export async function appendClipToWord(req: Request, res: Response, next: NextFunction) {
    console.log(req.file?.destination);
    
    if (typeof req.file === "undefined") {
        return res.status(Codes.UNPROCESSABLE_ENTITY).end()
    }

    // const word = await prisma?.clip.create({
    //     data: {
    //         path: req.file.filename,
    //         // @ts-ignore
    //         userID: req.session.id,
    //         wordID: getQueryItem(req.body.wordID),
    //         id: v4(),
    //     },
    // });

    return res.status(Codes.OK).json("ss");
}
