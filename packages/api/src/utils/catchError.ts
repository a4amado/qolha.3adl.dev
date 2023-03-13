import { NextFunction, Request, Response } from "express";

const catchError = (func: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await func(req, res, next);
    } catch (error) {        
        res.status(500).send(JSON.stringify(error))
        
    }
};

export default catchError;
