import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import butters from "a-promise-wrapper";
import prisma from "@backend/db";
import ValidateInput from "@backend/utils/validate.yup";
import Codes from "http-status-codes";
import { Schema$API$UserQuery } from "@schema/user/query-user";

const route = nextConnect();

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$UserQuery, req);

    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });

    const findUniqueWhere: { email?: string; id?: string } = {};
    if (Input.query._email) {
        findUniqueWhere.email = Input.query._email;
    } else {
        findUniqueWhere.id = Input.query._userId;
    }
    const user = await butters(
        prisma.user.findFirst({
            where: findUniqueWhere,
            select: {
                image: true,
                name: true,
                role: true,
                email: true,
                id: true,
            },
        })
    );
    if (user.error)
        return res.status(Codes.BAD_REQUEST).send({
            message: ["Internal Server Error"],
        });

    res.send(user.data);
});

export default route;
