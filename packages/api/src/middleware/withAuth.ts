import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { verify } from "jsonwebtoken";

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies.token);
    
    if (!req.cookies.token) {
        return res.send(StatusCodes.UNAUTHORIZED).end();
    }
    try {
        console.log(req);
        
        const user = verify(req.cookies.token, process.env.JWT_SECRET || "");
        console.log(user);
        
        // @ts-ignore
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED).end();
    }
};

export default withAuth;
