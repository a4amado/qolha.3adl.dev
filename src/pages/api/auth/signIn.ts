import ValidateInput from "@backend/utils/validate.yup";
import prisma from "@backend/db";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const route = nextConnect();

import butters from "a-promise-wrapper";
import Codes from "http-status-codes";
import { compareSync } from "bcrypt";
import { serialize } from "cookie";
import { Schema$API$signIn } from "@schema/auth/signIn";

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$signIn, req);
    if (!errors || errors.length) return res.status(Codes.BAD_REQUEST).send({ message: errors });

    let user = await butters(
        prisma.user.findFirst({
            where: {
                email: Input.body.email,
            },
            select: {
                account: {
                    select: {
                        password: true,
                    },
                },
                email: true,
                role: true,
                id: true,
            },
        })
    );

    if (user.error) {
        console.error(user.error);
        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Internal Server Error"],
        });
    }
    if (!user.data)
        return res.status(Codes.NOT_FOUND).send({
            message: ["Email is not Regesterd"],
        });

    const is_password_correct = compareSync(Input.body.password, user?.data?.account?.password);

    if (!is_password_correct) {
        return res.status(Codes.NOT_ACCEPTABLE).send({
            message: ["wrong password or email"],
        });
    }

    const token = sign(
        {
            role: user.data.role,
            id: user.data.id,
        },
        process.env.JWT_SECRET || "",
        {
            expiresIn: "12h",
        }
    );

    res.setHeader("Set-Cookie", serialize("token", token, { httpOnly: true, path: "/", sameSite: true }));
    res.status(Codes.OK).end();
});

export default route;
