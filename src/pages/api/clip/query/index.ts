import Codes from "http-status-codes";

import butters from "a-promise-wrapper";
import prisma from "@backend/db";

import ValidateInput from "@backend/utils/validate.yup";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { Schema$API$QueryClip } from "@schema/clip/query-clip";

const route = nextConnect();

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$QueryClip, req);
    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });

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

    if (clips.error) {
        console.error(clips.error);

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Internal Server Errors"],
        });
    }

    res.status(Codes.OK).send(clips.data.length > 1 ? clips.data : clips.data[0]);
});

export default route;
