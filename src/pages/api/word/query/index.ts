import Codes from "http-status-codes";
import butters from "a-promise-wrapper";
import prisma from "@backend/db";
import ValidateInput from "@backend/utils/validate.yup";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { Schema$API$QueryWord } from "@schema/word/query-word";

const route = nextConnect();

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$QueryWord, req);
    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });

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
    if (word.error) {
        console.error(word.error);

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Internal Server Error"],
        });
    }
    res.json(word.data.length > 1 ? word.data : word.data[0]);
});

export default route;
