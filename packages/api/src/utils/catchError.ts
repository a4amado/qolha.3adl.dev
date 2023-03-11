import { NextFunction, Request, Response } from "express";
import Codes from "http-status-codes";

const catchError = (func: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await func(req, res, next);
    } catch (error) {
        console.log(JSON.stringify(error));
        
        res.status(500).send(JSON.stringify(error))
        
    }
};

export default catchError;
