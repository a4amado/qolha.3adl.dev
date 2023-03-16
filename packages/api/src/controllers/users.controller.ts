import * as yup from "yup";

import { NextFunction, Request, Response } from "express";

import Codes from "http-status-codes";
import getQueryItem from "../utils/getQueryItem";
import prisma from "../utils/prismadb";

export async function getUser(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.findUnique({
        where: {
            id: getQueryItem(req.query.userID),
        },
        select: {
            name: true,
            id: true,
            _count: {
                select: {
                    clips: true,
                },
            },
        },
    });
    if (!user) {
        return res.status(Codes.NOT_FOUND).send(Codes.getStatusText(Codes.NOT_FOUND));
    }
    console.log(user);
    
    res.status(Codes.OK).send(user);
}

const deleteAccountSchema = yup.object().shape({
    userID: yup.string().uuid().required(),
});
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    deleteAccountSchema.validateSync(req.query);

    await prisma.user.delete({
        where: {
            id: req.body.userID,
        },
    });

    res.status(Codes.OK).end();
}
