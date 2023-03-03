import { NextFunction, Request, Response } from "express";
import Codes from "http-status-codes";

const catchError = (func: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await func(req, res, next);
    } catch (error) {
        console.log(error);

        return next({
            code: Codes.INTERNAL_SERVER_ERROR,
            msg: Codes.getStatusText(Codes.INTERNAL_SERVER_ERROR),
        });
    }
};

export default catchError;
