import { NextApiResponse } from "next";
import { RequestWithSession } from "../../web/src/types/next-auth";
import Http from "http-status-codes";

const verifyRole = async (req: RequestWithSession, res: NextApiResponse, next: any, { allowedRoles }: { allowedRoles: Array<"owner" | "admin" | "user"> }) => {
    // @ts-ignore
    if (allowedRoles.includes(req.session.role)) {
        res.status(Http.NON_AUTHORITATIVE_INFORMATION).json(Http.getStatusText(Http.NON_AUTHORITATIVE_INFORMATION));
        return;
    }

    next();
};

export default verifyRole;
