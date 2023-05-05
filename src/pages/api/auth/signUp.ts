import { InternalException } from "@backend/utils/exception";
import sendVarificationMail from "@backend/utils/mail/config";
import ValidateInput from "@backend/utils/validate.yup";
import prisma from "@backend/db";
import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const route = nextConnect();
import { z } from "zod";
import butters from "a-promise-wrapper";
import Codes from "http-status-codes";
import { hashSync } from "bcrypt";

export const Schema$signUp = z
    .object({
        body: z.object({
            username: z.string().min(4),
            password: z.string().min(10),
            vPassword: z.string().min(10),
            email: z.string().email(),
        }),
    })
    .superRefine(({ body: { password, vPassword } }, ctx) => {
        if (vPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
            });
        }
    });

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$signUp, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);

    let user = await butters(
        prisma.user.findFirst({
            where: {
                email: Input.body?.email,
            },
            select: {
                id: true,
            },
        })
    );

    if (user.error) return res.status(Codes.INTERNAL_SERVER_ERROR).send(user.error);
    if (user.data) return res.status(Codes.CONFLICT).send(["Email Already in Use"]);

    const verificationCode = randomUUID();

    let new_user = await butters(
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

    if (new_user.error || !new_user.data) return res.status(Codes.INTERNAL_SERVER_ERROR).send(user.error);

    await prisma.account.create({
        data: {
            userId: new_user?.data.id,
            password: hashSync(Input.body.password, 10),
        },
    });

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

        return res.status(Codes.INTERNAL_SERVER_ERROR).end("");
    }

    const token = sign(
        {
            role: new_user.data.role,
            id: new_user.data.id,
        },
        process.env.JWT_SECRET || "",
        {
            expiresIn: "12h",
        }
    );
    res.setHeader("token", token).status(Codes.OK).send(token);
});

export default route;
