import { NextFunction, Request, Response } from "express";

import Http from "http-status-codes";

const verifyRole = async (req: Request, res: Request, next: any, { allowedRoles }: { allowedRoles: Array<"owner" | "admin" | "user"> }) => {

    next();
};

export default verifyRole;
