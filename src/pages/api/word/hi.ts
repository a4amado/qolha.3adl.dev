import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../types/next-auth";
import withAuth from "../../../middleware/withAuth";
import isOwner from "../../../middleware/isOwner";
import { z } from "zod";
import HttpCodes from "http-status-codes";
import getQueryItem from "../../../lib/getQueryItem";

const router = nextConnect();

router.use(withAuth);

router.get(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const word = await prisma?.word.create({
    data: {
      ar: Math.random().toString(),
      userId: req.session.id,
    },
  });

  const clip = await prisma?.clip.create({
    data: {
      userID: req.session.id,
      path: "Path",
      wordID: word?.id,
    },
  });

  return res.json(clip);
});

export default router;
