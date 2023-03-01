import prisma from "../utils/prismadb";
import * as yup from "yup"
import { Request, Response, NextFunction } from "express";
import Codes from "http-status-codes"

import getQueryItem from "../utils/getQueryItem";


const singInSchema = yup.object().shape({
    username: yup.string().required().min(4),
    password: yup.string().min(10),
    vPassword: yup.string().oneOf([yup.ref("password")], "passwords does not match"),
    email: yup.string().email().required()
})




export async function signUp(req: Request, res: Response, next: NextFunction) {

    singInSchema.validateSync(req.body, { abortEarly: false });

    let user = await prisma.user.findUnique({
            where: {
                email: getQueryItem(req.body.email)
            }
        })
        if (user) {
            return next({
                msg: "Email already Exists",
                code: Codes.NOT_ACCEPTABLE
            })
        }

        user = await prisma.user.create({
            data: {
                email: getQueryItem(req.body.email),
                role: "none",
            }
        })
    
        await prisma.account.create({
            // @ts-ignore
            data: {
                // @ts-ignore
                userID: user?.id,
                hash: req.body.password,
            }
        })
    
    res.status(Codes.OK).end();
}


export async function signIn(req: Request, res: Response,  next: NextFunction) {

}