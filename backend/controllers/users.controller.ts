import * as yup from "yup";

import { NextFunction, Request, Response } from "express";

import Codes from "http-status-codes";
import getQueryItem from "../utils/getQueryItem";
 
import butters from "a-promise-wrapper";
import * as db from "@db";

export async function getUser(req: Request, res: Response, next: NextFunction) {
    const user = await butters(db.User.findByPk(getQueryItem(req.query.userID), {
        attributes: [
            "id",
            "name",
            [db.default.fn("COUNT", db.default.col("clips")), "n_clips"]
        ],
        include: {
            model: db.Clip,
            as: "clips",
            attributes: ["id", "clipName"]
        }
    }));

    if (user.error) return res.status(Codes.INTERNAL_SERVER_ERROR).send(Codes.getStatusText(Codes.INTERNAL_SERVER_ERROR));

    res.status(Codes.OK).send(user.data);
}

const deleteAccountSchema = yup.object().shape({
    userID: yup.string().uuid().required(),
});
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    deleteAccountSchema.validateSync(req.query);

    const deletedAccount = await butters(db.User.destroy({
        where: {
            id: req.body.userID
        },
        force: true
    }));

    if (deletedAccount.error) return res.status(Codes.INTERNAL_SERVER_ERROR).send(Codes.getStatusText(Codes.INTERNAL_SERVER_ERROR));

    res.status(Codes.OK).send(deletedAccount.data)
}

export async function searchForUserWithEmailAddress(req: Request, res: Response, next: NextFunction) {

    const user = await butters(db.User.findOne({
        where: {
            email: getQueryItem(req.query.email)
        }
    }))
    
    if (user.error) return res.status(Codes.INTERNAL_SERVER_ERROR).send(Codes.getStatusText(Codes.INTERNAL_SERVER_ERROR));

    res.sendStatus(Codes.OK).json(user);
}
