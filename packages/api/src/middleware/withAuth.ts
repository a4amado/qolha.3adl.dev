import { NextFunction, Request, Response } from "express";

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
    next()
};

export default withAuth;
