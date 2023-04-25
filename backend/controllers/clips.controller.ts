import { InternalException } from "../utils/exception";
import { Request, Response } from "express";

import Codes from "http-status-codes";
import { createReadStream } from "node:fs";
import getQueryItem from "../utils/getQueryItem";
import { join } from "node:path";
import butters from "a-promise-wrapper";
import * as db from "@db";

export async function streamClip(req: Request, res: Response) {
    const clip = await butters(db.Clip.findByPk(getQueryItem(req.query.clipID), {
        attributes: []
    }));
        if (clip.error) return InternalException(res, "Internal Server Error");
        if (!clip.data) return res.sendStatus(Codes.NOT_FOUND).send("clip Not Found")
        const stream = createReadStream(join(process.cwd(), "files", "clips", clip.data.clipName));

        stream.on("error", (error) => {
            return InternalException(res, error);
        });
        stream.pipe(res);
}
export async function getClipThatNeedsToBeReviewed(req: Request, res: Response) {
    const clips = await  butters(db.Clip.findAll({
        limit: 5,
        where: {
            reject: false,
            accept: false,

        }, 
        include: [
            {
                model: db.User,
                attributes:["id", "email", "image"]
            },
            {
                model: db.Word,
                attributes:["id", "ar"]
            }
        ],
        attributes: ["clipName","id"]
    }));

    if (clips.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    
    res.sendStatus(Codes.OK).send(clips.data)
}

export async function acceptClip(req: Request, res: Response) {
    
        const clipStatus = await butters(db.Clip.update({
            reject: false,
            accept: true
        }, {
            where: {
                id: getQueryItem(req.query.clipID),
            }
        }))

        if (clipStatus.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end();
        return res.status(Codes.OK).json(clipStatus.data);
    
}

export async function rejectClip(req: Request, res: Response) {
    
        const clipStatus = await butters(db.Clip.destroy(  {
            where: {
                id: getQueryItem(req.query.clipID),
            },
            force: true
        }))

        if (clipStatus.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end();
        return res.status(Codes.OK).json(clipStatus.data);
}

export async function appendRate(req: Request, res: Response) {
    const clipRate = await butters(db.Rate.upsert({
            clipId: getQueryItem(req.query.clipID),
            // @ts-ignore
            userId: req.session.id,
            rate: Number(getQueryItem(req.body.rate)),
    }));
    if (clipRate.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).end();
    res.sendStatus(Codes.OK).send(clipRate)
}
