import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

type roles = "admin" | "all";

const verifyRole = (allowedRoles: Array<roles>) => async (req: Request, res: Response, next: NextFunction) => {
    if (allowedRoles.includes("all")) {
        return next();
    }
    // @ts-ignore
    if (allowedRoles.includes(req.user.role)) {
        return next();
    }
    res.status(StatusCodes.UNAUTHORIZED).end();
};

export default verifyRole;
