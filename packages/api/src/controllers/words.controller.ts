import { NextFunction, Request, Response } from "express";

import Codes from "http-status-codes";
import getQueryItem from "../utils/getQueryItem";
import prisma from "../utils/prismadb";
import { v4 } from "uuid";


export async function QueryWord(req: Request, res: Response) {
    
    const word = await prisma.word.findFirst({
        where: {
            id: getQueryItem(req.query.wordID),
        },
    });
    return res.status(Codes.OK).send(word);
}

export async function appendWord(req: Request, res: Response) {
    
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
        ar: "مثال لكلمة عربية",
        id: Math.random().toString(),
        createBy: { select: { name: "احمد", id: Math.random().toString(),} },
    });
}


export async function listClipsForWord(req: Request, res: Response) {
    

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
