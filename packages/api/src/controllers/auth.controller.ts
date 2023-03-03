import prisma from "../utils/prismadb";
import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import Codes from "http-status-codes";
import { compareSync, hashSync } from "bcrypt";
import getQueryItem from "../utils/getQueryItem";
import { sign } from "jsonwebtoken";

import validateYupSchema from "../utils/validate.yup";
import { InternalException, YupException } from "../utils/exception";
import { User } from "@prisma/client";

const singUpSchema = yup.object().shape({
    username: yup.string().required().min(4),
    password: yup.string().min(10).required(),
    vPassword: yup
        .string()
        .oneOf([yup.ref("password")], "passwords does not match")
        .required(),
    email: yup.string().email().required(),
});

export async function signUp(req: Request, res: Response, next: NextFunction) {
    const isDataValid = validateYupSchema(singUpSchema, req.body);
    if (isDataValid.errors.length > 0) {
        return YupException(res, isDataValid.errors);
    }

    try {
        let user = await prisma.user.findFirst({
            where: {
                email: getQueryItem(req.body.email),
            },
        });
        if (user) {
            res.status(Codes.CONFLICT).send(["Email Already in Use"]);
        }
    } catch (error) {
        return InternalException(res);
    }

    let new_user: User;
    try {
        new_user = await prisma.user.create({
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
                hash: hashSync(req.body.password, 11),
            },
        });
    } catch (error) {
        return InternalException(res);
    }
    res.status(Codes.OK).end();
}

const singInSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(10),
});

export async function signIn(req: Request, res: Response) {
    const isDataVlaid = validateYupSchema(singInSchema, req.body);
    if (isDataVlaid.errors.length > 0) {
        return YupException(res, isDataVlaid.errors);
    }

    let user;
    try {
        user = await prisma.user.findUniqueOrThrow({
            where: {
                email: req.body.email,
            },
            select: {
                account: {
                    select: {
                        hash: true,
                    },
                },
                email: true,
                role: true,
                id: true,
            },
        });
        if (!user?.account?.hash) {
            return res.status(Codes.NOT_FOUND).end();
        }
    } catch (error) {
        return InternalException(res);
    }
    
    const is_password_correct = compareSync(req.body.data, user?.account?.hash);

    if (!is_password_correct) {
        return res.status(Codes.NOT_ACCEPTABLE).send("wrong password or email");
    }

    res.cookie(
        "token",
        sign(
            {
                role: user.role,
                id: user.id,
            },
            "sadsd ",
            {
                expiresIn: "12h",
            }
        )
    );
    res.status(Codes.OK).send(Codes.getStatusText(Codes.OK));
}
