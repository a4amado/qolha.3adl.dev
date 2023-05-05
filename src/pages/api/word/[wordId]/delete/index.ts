import Codes from "http-status-codes";
import butters from "a-promise-wrapper";
import prisma from "@backend/db";
import ValidateInput from "@backend/utils/validate.yup";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import withAuth from "@backend/middleware/withAuth";
import verifyRole from "@backend/middleware/verifyRole";
import { Schema$API$DeleteWord } from "@schema/word/delete-word";

const route = nextConnect();

route.delete(withAuth, verifyRole(["admin"]), async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$DeleteWord, req);
    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });

    const word = await butters(
        prisma.word.delete({
            where: {
                id: Input.query.wordId,
            },
        })
    );

    if (word.error) {
        console.error(word.error);

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Internal Server Error"],
        });
    }

    return res.status(Codes.OK);
});

export default route;
