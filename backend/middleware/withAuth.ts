import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";

export type UserSession = Session["user"] & {
    role: string;
};

const withAuth = async (
    req: NextApiRequest & {
        user?: UserSession;
    },
    res: NextApiResponse,
    next: any
) => {
    const user = await getServerSession(req, res, authOptions(req, res));

    if (!user?.expires) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            message: [ReasonPhrases.UNAUTHORIZED],
        });
    }

    // @ts-ignore
    req.user = user.user;
    return next();
};

export default withAuth;
