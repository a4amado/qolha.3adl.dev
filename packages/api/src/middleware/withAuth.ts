
import { NextFunction, Request, Response } from "express";
import HttpCode from "http-status-codes";

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
    next()
};

export default withAuth;
