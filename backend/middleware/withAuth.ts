import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const withAuth = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    console.log("req.cookies", req.cookies);

    if (!req.cookies.token) {
        return res.send(StatusCodes.UNAUTHORIZED);
    }
    try {
        const user = verify(req.cookies.token, process.env.JWT_SECRET || "");

        // @ts-ignore
        req.user = user;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    }
};

export default withAuth;
