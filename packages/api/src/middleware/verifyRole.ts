import { NextFunction, Request, Response } from "express";

const verifyRole = async (req: Request, res: Response, next: NextFunction, { allowedRoles }: { allowedRoles: Array<"owner" | "admin" | "user"> }) => {

    next();
};

export default verifyRole;
