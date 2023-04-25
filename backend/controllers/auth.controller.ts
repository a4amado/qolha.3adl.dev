import { InternalException } from "../utils/exception";
import { NextFunction, Request, Response } from "express";
import { compareSync } from "bcrypt";
import Codes from "http-status-codes";

import { sign } from "jsonwebtoken";
import * as db from "@db";

import butters from "a-promise-wrapper";

export async function signUp(req: Request, res: Response, next: NextFunction) {
    let user = await butters(
        db.User.findOne({
            where: {
                email: req.body.email,
            },
        })
    );

    if (user.error) return InternalException(res, "Internal Server Error");
    if (user.data) return res.status(Codes.CONFLICT).send(["Email Already in Use"]);

    let new_user = await butters(
        db.User.create({
            email: req.body.email,
            role: "user",
            name: req.body.email,

        }, {returning: ["id"]})
    );

    if (new_user.error) return InternalException(res, "Internal Server Error");
    
    await db.Account.create({
        userId: new_user?.data.id,
        password: req.body.password,
    }, {returning: []});

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
    let user = await butters(
        db.User.findOne({
            where: {
                email: req.body.email,
            },
            include: {
                model: db.Account,
                as: "account"
            }
        })
    );

    if (user.error) return InternalException(res, "Internals Server Error");
    if (!user.data) return res.sendStatus(Codes.NOT_FOUND).send("Email is not Regesterd");

    const is_password_correct = compareSync(req.body.password, user.data?.account.password);

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

    res.cookie("token", token, {
        httpOnly: true,
        path: "/",
    });
    res.status(Codes.OK).end();
}
