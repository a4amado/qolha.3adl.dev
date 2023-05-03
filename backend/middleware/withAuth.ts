import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { verify } from "jsonwebtoken";

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.token) {
        return res.send(StatusCodes.UNAUTHORIZED).end();
    }
    try {
        const user = verify(req.cookies.token, process.env.JWT_SECRET || "");

        // @ts-ignore
        req.user = user;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED).end();
    }
};

export default withAuth;
