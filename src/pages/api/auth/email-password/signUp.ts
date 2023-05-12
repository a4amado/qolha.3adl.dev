import sendVarificationMail from "@backend/utils/mail/config";
import ValidateInput from "@backend/utils/validate.yup";
import prisma, { AuthPrisma } from "@backend/db";
import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import butters from "a-promise-wrapper";
import Codes from "http-status-codes";
import { hashSync } from "bcrypt";
import { Schema$API$SignUp } from "@schema/auth/signUp";
const route = nextConnect();

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$SignUp, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send({ message: errors });

    const user = await butters(
        prisma.user.findFirst({
            where: {
                email: Input.body?.email,
            },
            select: {
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
    if (user.data) {
        return res.status(Codes.CONFLICT).send({
            message: ["Email Already in Use"],
        });
    }

    const verificationCode = randomUUID();

    const new_user = await butters(
        prisma.user.create({
            data: {
                email: Input.body?.email,
                role: "user",
                name: Input.body.username,
                code: verificationCode,
            },
            select: {
                role: true,
                id: true,
                email: true,
                name: true,
            },
        })
    );

    if (new_user.error || !new_user.data) {
        console.error(user.error);
        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error",
        });
    }

    const account = await butters(
        prisma.account.create({
            data: {
                userId: new_user?.data.id,
                password: hashSync(Input.body.password, 10),
                provider: "local",
                providerAccountId: new_user?.data.id,
                type: "credentials",
            },
        })
    );

    if (account.error) {
        console.error(user.error);
        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error",
        });
    }

    const sendEmail = await butters(
        sendVarificationMail({
            email: new_user.data.email,
            userID: new_user.data.id,
            code: verificationCode,
            username: new_user.data.name,
        })
    );

    // Delete every thing
    if (sendEmail.error) {
        await butters(
            prisma.user.delete({
                where: {
                    id: new_user.data.id,
                },
            })
        );

        console.error(sendEmail.error);

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error",
        });
    }

    res.status(Codes.OK).end();
});

export default route;
