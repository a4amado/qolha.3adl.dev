import { NextFunction, Request, Response } from "express";

import Codes from "http-status-codes";
import getQueryItem from "../utils/getQueryItem";

import { v4 } from "uuid";
import butters from "a-promise-wrapper";
import * as db from "../../db";

export async function QueryWord(req: Request, res: Response) {
    const word = await butters(
        db.Word.findByPk(getQueryItem(req.query.wordID), {
            attributes: ["id", "ar"],
        })
    );
    if (word.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR);
    return res.status(Codes.OK).send(word);
}

export async function appendWord(req: Request, res: Response) {
    const word = await butters(
        db.Word.create({
            ar: getQueryItem(req.query.word),
            // @ts-ignore
            userId: req?.session?.id,
            id: v4(),
            accepted: false,
        })
    );

    if (word.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR);
    return res.status(Codes.OK).send(word.data);
}

export async function getWordWithTheLeastClips(req: Request, res: Response) {
    const word = await butters(
        db.Word.findOne({
            attributes: ["id", "ar", [db.default.fn("COUNT", db.default.col("clips")), "n_clips"]],
            order: [["n_clips", "ASC"]],
            limit: 1,
            include: {
                model: db.User,
                attributes: ["id", "name", "image"],
            },
        })
    );

    if (word.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end();

    res.json(word.data);
}

export async function listClipsForWord(req: Request, res: Response) {
    const clips = await butters(
        db.Word.findOne({
            where: {
                id: getQueryItem(req.query.wordID),
            },
            attributes: ["ar"],
            include: [
                {
                    model: db.Clip,
                    as: "clips",
                    attributes: ["id", "clipName"],
                    limit: 15,
                },
                {
                    model: db.User,
                    as: "user",
                    attributes: ["name", "id", "image"],
                },
            ],
        })
    );

    if (clips.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end();

    res.status(Codes.OK).send(clips.data);
}

export async function appendClipToWord(req: Request, res: Response, next: NextFunction) {
    const clip = await butters(
        db.Clip.create({
            clipName: req.file?.filename || "",
            // @ts-ignore
            userId: req.user.id,
            wordId: getQueryItem(req.params.wordID),
            accept: false,
            reject: false,
        })
    );

    if (clip.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end();

    return res.status(Codes.OK).json("ss");
}

export async function skipWord(req: Request, res: Response, next: NextFunction) {
    const word = await butters(
        db.Word.destroy({
            where: {
                id: getQueryItem(req.params.wordID),
            },
            force: true,
        })
    );

    if (word.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end();

    return res.status(303).redirect("/words/getWordWithTheLeastClips");
}
