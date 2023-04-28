import { InternalException } from "../utils/exception";
import { NextFunction, Request, Response } from "express";
import { compareSync } from "bcrypt";
import Codes from "http-status-codes";

import { sign } from "jsonwebtoken";
import * as db from "../../db";

import butters from "a-promise-wrapper";
import getQueryItem from "@backen/utils/getQueryItem";
import { randomUUID } from "crypto";
import sendVarificationMail from "@backen/utils/mail/config";
import { send } from "micro/types/src/lib";

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

    const verificationCode = randomUUID();

    let new_user = await butters(
        db.User.create(
            {
                email: req.body.email,
                role: "user",
                name: req.body.email,
                code: verificationCode
            },
            { returning: ["id"] }
        )
    );

    if (new_user.error) return InternalException(res, "Internal Server Error");

    await db.Account.create(
        {
            userId: new_user?.data.id,
            password: req.body.password,
        },
        { returning: [] }
    );

    const sendEmail = await butters(sendVarificationMail({
        email: new_user.data.email,
        userID: new_user.data.code,
        code: verificationCode,
        username: new_user.data.name
    }));

    // Delete every thing 
    if (sendEmail.error) {
        await butters(db.User.destroy({
            where: {
                id: new_user.data.id
            }
        }));

        return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end("")
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
                as: "account",
            },
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


export async function verifyAccount(req: Request, res: Response) {

    const getAccount = await butters(db.User.findByPk(req.params.userID, {
        attributes: ["id", "account", "emailVerified", "code"]
    }));

    if (getAccount.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end();
    if (getAccount.data?.emailVerified) return res.sendStatus(Codes.OK).send("Email Already Verified");
    if (getAccount.data?.code != req.params.code) return res.sendStatus(Codes.BAD_REQUEST).send("Wrong Code");

    const verifyAccount = await butters(db.User.update({
        emailVerified: new Date(),
        code: ""
    }, {
        where: {
            id: getQueryItem(req.params.userID)
        }
    }));
    if (verifyAccount.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end();


    return res.sendStatus(Codes.OK).send("Account Verified Successfully")
}
