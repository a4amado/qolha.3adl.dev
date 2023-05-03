import validateZodSchema from "@backend/utils/validate.zod";
import prisma from "@db";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const route = nextConnect();
import { z } from "zod";
import butters from "a-promise-wrapper";
import Codes from "http-status-codes";
import { compareSync } from "bcrypt";

const Schema$signIn = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(10),
    }),
});

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(Schema$signIn, req);
    if (!errors || errors.length) return res.status(Codes.BAD_REQUEST).send(errors);

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

    if (user.error) return res.status(Codes.INTERNAL_SERVER_ERROR).end();
    if (!user.data) return res.status(Codes.NOT_FOUND).send("Email is not Regesterd");

    const is_password_correct = compareSync(Input.body.password, user?.data?.account?.password + "");

    if (!is_password_correct) {
        return res.status(Codes.NOT_ACCEPTABLE).send("wrong password or email");
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

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     path: "/",
    // });
    res.status(Codes.OK).end();
});

export default route;
