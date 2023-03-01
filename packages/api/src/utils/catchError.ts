import { NextFunction, Request, Response } from "express";
import Codes from "http-status-codes";

const catchError =  (func: any) => async (req: Request, res: Response, next: NextFunction) => {
try {
    await func(req, res)
} catch (error) {
    res.status(Codes.INTERNAL_SERVER_ERROR).send(error || Codes.getStatusText(Codes.OK))
}
}


export default  catchError;