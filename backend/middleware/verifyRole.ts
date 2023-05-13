import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

type roles = "owner" | "admin" | "user";
import { UserSession } from "./withAuth";

const verifyRole = (allowedRoles: Array<roles>) => async (req: NextApiRequest & { user: UserSession }, res: NextApiResponse, next: any) => {
    if (allowedRoles.includes("user")) {
        return next();
    }

    // @ts-ignore
    if (allowedRoles.includes(req?.user?.role || "")) {
        return next();
    }
    res.status(StatusCodes.UNAUTHORIZED).end();
};

export default verifyRole;
