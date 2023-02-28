
import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../utils/prismadb";
import Codes from "http-status-codes";
import getQueryItem from "../utils/getQueryItem";

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
    try {
        const word = await prisma.word.findFirst({
            where: {
                id: getQueryItem(req.query.wordID)
            }
        });
        return res.status(Codes.OK).send(word)
    } catch (error) {
        return res.status(Codes.UNPROCESSABLE_ENTITY).send(error);
    }
}


export async function appendWord(req: Request, res: Response) {
    const checkAppendWord = appendWordSchema.safeParse(req.query);
    if (!checkAppendWord.success) return res.status(Codes.BAD_REQUEST).json(checkAppendWord.error.errors);

    try {
        const word = await prisma?.word.create({
            data: {
                ar: getQueryItem(req.query.word),
                // @ts-ignore
                userId: req?.session?.id,
                id: v4(),
            },
        })
        return res.status(Codes.OK).send(word)
    } catch (error) {
        return res.status(Codes.UNPROCESSABLE_ENTITY).send(error);
    }
}


export async function getWordWithTheLeastClips(req: Request, res: Response) {
    try {

        const word = await prisma?.word.findFirst({
            select: {
                ar: true,
                id: true,
                createBy: { select: { name: true, id: true } },
            },
            orderBy: {
                clips: {
                    _count: "asc",
                },
            },
            take: 1,
        });

        return res.json(word);
    } catch (error) {
        return res.status(Codes.INTERNAL_SERVER_ERROR).send(error);
    }
}