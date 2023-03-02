import prisma from "../utils/prismadb";
import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import Codes from "http-status-codes";
import { compareSync, hashSync } from "bcrypt";
import getQueryItem from "../utils/getQueryItem";

const singUpSchema = yup.object().shape({
    username: yup.string().required().min(4),
    password: yup.string().min(10),
    vPassword: yup.string().oneOf([yup.ref("password")], "passwords does not match"),
    email: yup.string().email().required(),
});

export async function signUp(req: Request, res: Response, next: NextFunction) {
    singUpSchema.validateSync(req.body, { abortEarly: false });

    let user = await prisma.user.findUnique({
        where: {
            email: getQueryItem(req.body.email),
        },
    });
    if (user) {
        return next({
            msg: "Email already Exists",
            code: Codes.NOT_ACCEPTABLE,
        });
    }

    user = await prisma.user.create({
        data: {
            email: getQueryItem(req.body.email),
            role: "none",
        },
    });

    await prisma.account.create({
        // @ts-ignore
        data: {
            // @ts-ignore
            userID: user?.id,
            hash: req.body.password,
        },
    });

    res.status(Codes.OK).end();
}

const singInSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(10),
});

export async function signIn(req: Request, res: Response, next: NextFunction) {
    singInSchema.validateSync(req.body, { abortEarly: false });

    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
        select: {
            account: {
                select: {
                    hash: true,
                },
            },
        },
    });
    if (!user?.account?.hash) {
        return res.status(Codes.NOT_FOUND).end();
    }
    const is_password_correct = compareSync(req.body.data, user?.account?.hash);

    if (!is_password_correct) {
        return res.status(Codes.NOT_ACCEPTABLE).send("wrong password or email");
    }

    res.status(Codes.OK).send(Codes.getStatusText(Codes.OK));
}
