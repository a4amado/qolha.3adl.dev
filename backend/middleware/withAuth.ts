import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import butters from "a-promise-wrapper";

const withAuth = async (req: NextApiRequest & { user?: (Session & { role: string }) | null }, res: NextApiResponse, next: any) => {
    const user = await butters(getServerSession(req, res, authOptions));
    if (user.error)
        return res.status(StatusCodes.UNAUTHORIZED).send({
            message: [ReasonPhrases.UNAUTHORIZED],
        });
    req.user = user.data;
    return next();
};

export default withAuth;
