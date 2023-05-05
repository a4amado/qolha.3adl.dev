import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

type roles = "admin" | "all";

const verifyRole = (allowedRoles: Array<roles>) => async (req: NextApiRequest, res: NextApiResponse, next: any) => {
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
