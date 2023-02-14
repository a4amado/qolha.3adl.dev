import { NextApiResponse } from "next";
import { RequestWithSession } from "../types/next-auth";
import Http from "http-status-codes";

const isOwner = async (req: RequestWithSession, res: NextApiResponse, next: any) => {
  // @ts-ignore
  if (req.session.role !== "owner") {
    res.status(Http.NON_AUTHORITATIVE_INFORMATION).json(Http.getStatusText(Http.NON_AUTHORITATIVE_INFORMATION));
    return;
  }

  next();
};

export default isOwner;
