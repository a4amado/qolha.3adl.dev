import { InternalException } from "../utils/exception";
import { NextFunction, Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import Codes from "http-status-codes";

import prisma from "../utils/prismadb";
import { sign } from "jsonwebtoken";

import { serialize } from "cookie";
import * as sequelize from "../../db";

import butters from "a-promise-wrapper"
 
export async function signUp(req: Request, res: Response, next: NextFunction) {
    let user = await butters(sequelize.User.findOne({
        where: {
            email: req.body.email,
        }
    }));

    if (user.error) return InternalException(res, "Internal Server Error")
    if (user.data) return res.status(Codes.CONFLICT).send(["Email Already in Use"]);

    

    let new_user = await butters(sequelize.User.create({
        email: req.body.email,
        role: "user",
        name: req.body.email
    }));

    if (new_user.error) return InternalException(res, "Internal Server Error")
    
    await sequelize.Account.create({
        userId: new_user?.data.id,
        password: req.body.password
    });

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

    res.cookie("token", token);
    res.sendStatus(Codes.OK).send(token);
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
