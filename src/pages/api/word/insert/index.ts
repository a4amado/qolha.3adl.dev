import Codes from "http-status-codes";
import { v4 } from "uuid";
import butters from "a-promise-wrapper";
import prisma from "@backend/db";
import ValidateInput from "@backend/utils/validate.yup";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

import { Schema$API$InsertWord } from "@schema/word/insert-word";
const route = nextConnect();

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$InsertWord, req);

    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });
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

    if (word.error) {
        console.error(word.error);

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Internal Server Error"],
        });
    }
    return res.status(Codes.OK).send(word.data);
});

export default route;
