import Codes from "http-status-codes";
import butters from "a-promise-wrapper";
import prisma from "@db";
import validateZodSchema from "@backend/utils/validate.zod";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const route = nextConnect();

export const Schema$QueryWord = z.object({
    query: z.object({
        wordID: z.string().uuid(),
    }),
});

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(Schema$QueryWord, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);

    const word = await butters(
        prisma.word.findFirst({
            select: {
                id: true,
                ar: true,
                clips: {
                    select: {
                        clipName: true,
                        id: true,
                        user: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                    where: {
                        accept: true,
                    },
                },
            },
            where: {
                id: Input.query.wordID,
            },
        })
    );
    if (word.error) return res.status(Codes.INTERNAL_SERVER_ERROR);
    return res.status(Codes.OK).send(word);
});

export const DeleteWord = z.object({
    query: z.object({
        wordId: z.string().uuid(),
    }),
});

route.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(DeleteWord, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    const word = await butters(
        prisma.word.delete({
            where: {
                id: Input.query.wordId,
            },
        })
    );

    if (word.error) return res.status(Codes.INTERNAL_SERVER_ERROR).end();

    return res.status(Codes.OK);
});
export default route;
