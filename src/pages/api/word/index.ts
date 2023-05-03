import Codes from "http-status-codes";
import { v4 } from "uuid";
import butters from "a-promise-wrapper";
import prisma from "@db";
import validateZodSchema from "@backend/utils/validate.zod";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { Prisma } from "@prisma/client";
const route = nextConnect();

export const InsertWord = z.object({
    body: z.object({
        word: z.string(),
        description: z.string(),
    }),
});

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(InsertWord, req);

    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    const word = await butters(
        prisma.word.create({
            data: {
                ar: Input.body.word,
                // @ts-ignore
                userId: req?.session?.id,
                id: v4(),
                accepted: false,
                description: req.body.description,
            },
        })
    );

    if (word.error) return res.status(Codes.INTERNAL_SERVER_ERROR).send(word.error);
    return res.status(Codes.OK).send(word.data);
});

export const queryWord = z.object({
    query: z.object({
        _sort: z.enum(["clips", "date"]).optional(),
        _order: z.enum(["asc", "desc"]).optional(),
        _userID: z.string().uuid().optional(),
        _email: z.string().email().optional(),
        _limit: z.preprocess((_limit) => parseInt(z.string().parse(_limit), 10), z.number().positive().max(10).min(1)).optional(),
        _page: z.preprocess((_page) => parseInt(z.string().parse(_page), 10), z.number().positive().min(1).optional()).optional(),
    }),
});

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(queryWord, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);

    const searchObject: Prisma.WordFindManyArgs = {
        take: Input.query._limit,
        skip: (Input.query._page || 0) * 10,
    };
    if (Input.query._sort) {
        searchObject.orderBy = {
            [Input.query._sort]: {
                _count: Input.query._order,
            },
        };
    }
    if (Input.query._userID) {
        searchObject.where = {
            ...searchObject.where,
            userId: Input.query._userID,
        };
    }
    if (Input.query._email) {
        searchObject.where = {
            ...searchObject.where,
            user: {
                email: Input.query._email,
            },
        };
    }
    const word = await butters(prisma.word.findMany(searchObject));
    if (word.error) return res.status(Codes.INTERNAL_SERVER_ERROR).send(word.error);
    res.json(word.data.length > 1 ? word.data : word.data[0]);
});

export default route;
