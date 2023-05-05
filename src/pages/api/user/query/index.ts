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
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);

    if (Input.query._email) {
    }
    const user = await butters(
        prisma.user.findUnique({
            where: {},
        })
    );
});

export default route;
