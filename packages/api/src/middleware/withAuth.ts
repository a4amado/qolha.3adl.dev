import { getServerSession } from "next-auth";
import { NextApiResponse, NextApiHandler } from "next/types";
import { RequestWithSession } from "../../web/src/types/next-auth";
import HttpCode from "http-status-codes";
import { authOptions } from "../../web/src/pages/api/auth/[...nextauth]";

const withAuth = async (req: RequestWithSession, res: NextApiResponse, next: any) => {
    try {
        // @ts-ignore
        const session = await getServerSession(req, res, authOptions);

        if (!session?.user) throw "";

        // @ts-ignore
        req.session = session;
        next();
    } catch (error) {
        res.status(HttpCode.NON_AUTHORITATIVE_INFORMATION).json(HttpCode.getStatusText(HttpCode.NON_AUTHORITATIVE_INFORMATION));
    }
};

export default withAuth;
