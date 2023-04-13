import { InternalException } from "../utils/exception";
import { NextFunction, Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";

import Codes from "http-status-codes";

import prisma from "../utils/prismadb";
import { sign } from "jsonwebtoken";

import { serialize } from "cookie";

export async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        let user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (user) {
            return res.status(Codes.CONFLICT).send(["Email Already in Use"]);
        }
    } catch (error) {
        console.log(error);

        return InternalException(res, error);
    }

    let new_user: any;
    try {
        new_user = await prisma.user.create({
            data: {
                email: req.body.email,
                role: "none",
            },
            select: {
                id: true,
            },
        });

        await prisma.account.create({
            // @ts-ignore
            data: {
                // @ts-ignore
                userID: new_user?.id,
                hash: hashSync(req.body.password, 11),
            },
        });
    } catch (error) {
        console.log(error);

        return InternalException(res, error);
    }

    const token = sign(
        {
            role: new_user.role,
            id: new_user.id,
        },
        process.env.JWT_SECRET || "",
        {
            expiresIn: "12h",
        }
    );

    res.cookie("token", token);
    res.status(Codes.OK).send(token);
}

export async function signIn(req: Request, res: Response) {
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
        console.log(user);

        if (!user?.account?.hash) {
            return res.status(Codes.NOT_FOUND).end();
        }
    } catch (error) {
        return InternalException(res, error);
    }

    const is_password_correct = compareSync(req.body.password, user?.account?.hash);

    if (!is_password_correct) {
        return res.status(Codes.NOT_ACCEPTABLE).send("wrong password or email");
    }

    const token = sign(
        {
            role: user.role,
            id: user.id,
        },
        process.env.JWT_SECRET || "",
        {
            expiresIn: "12h",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        path: "/",
    });
    res.status(Codes.OK).end();
}
