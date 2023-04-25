import { NextFunction, Request, Response } from "express";

import Codes from "http-status-codes";
import { v4 } from "uuid";


export async function queryHits(req: Request, res: Response, next: NextFunction) {
    return new Promise((reso) => {
        setTimeout(() => {
            res.status(Codes.OK).json(
                Array.from({ length: 10 }, () => ({
                    ar: "أنا",
                    id: v4(),
                }))
            );
        }, 3000);
    });
}
