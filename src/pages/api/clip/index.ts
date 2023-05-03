import Codes from "http-status-codes";

import butters from "a-promise-wrapper";
import prisma from "@db";

import validateZodSchema from "@backend/utils/validate.zod";
import nextConnect from "next-connect";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

const route = nextConnect();

export const QueryClips = z.object({
    query: z.object({
        _wordId: z.string().uuid().optional(),
        _userId: z.string().uuid().optional(),
        _take: z.preprocess((_take) => parseInt(z.string().parse(_take), 10), z.number().min(1).max(10).default(5).optional()),
        _page: z.preprocess((_page) => parseInt(z.string().parse(_page), 10), z.number().min(1).default(1).optional()),
        _order: z.enum(["asc", "desc"]).optional(),
        _sort: z.enum(["createdAt"]).optional(),
        _limit: z.preprocess((_limit) => parseInt(z.string().parse(_limit), 10), z.number().min(1).max(10).default(1).optional()),
    }),
});

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(QueryClips, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);

    const query: Prisma.ClipFindManyArgs = {};
    if (Input.query._userId) {
        query.where = {
            userId: Input.query._userId,
        };
    }
    if (Input.query._wordId) {
        query.where = {
            ...query.where,
            wordId: Input.query._wordId,
        };
    }
    if (Input.query._order) {
        query.take = Input.query._limit;
    }

    const clips = await butters(prisma.clip.findMany(query));

    if (clips.error) return res.status(Codes.INTERNAL_SERVER_ERROR).end();

    res.status(Codes.OK).send(clips.data.length > 1 ? clips.data : clips.data[0]);
});

export const appendClipToWord = z.object({
    query: z.object({
        wordId: z.string().uuid(),
    }),
});

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(appendClipToWord, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    const clip = await butters(
        prisma.clip.create({
            data: {
                // @ts-ignore

                clipName: req.file?.filename || "",
                // @ts-ignore
                userId: req.user.id,

                wordId: Input.query.wordId,
                accept: false,
                reject: false,
            },
        })
    );

    if (clip.error) return res.status(Codes.INTERNAL_SERVER_ERROR).end();

    return res.status(Codes.OK).send("ss");
});

export default route;
