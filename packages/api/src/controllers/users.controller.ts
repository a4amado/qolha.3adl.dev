import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import getQueryItem from "../utils/getQueryItem";
import prisma from "../utils/prismadb";
import Codes from "http-status-codes";

const getUserShema = yup.object().shape({
    userID: yup.string().required().uuid(),
});

export async function getUser(req: Request, res: Response, next: NextFunction) {
    getUserShema.validateSync(req.query);

    const user = await prisma.user.findUnique({
        where: {
            id: getQueryItem(req.query.userID),
        },
        select: {
            name: true,
            id: true,
            _count: {
                select: {
                    words: true,
                    clips: true,
                },
            },
        },
    });
    if (!user) {
        return res.status(Codes.NOT_FOUND).send(Codes.getStatusText(Codes.NOT_FOUND));
    }
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
