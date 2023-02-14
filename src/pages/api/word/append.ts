import { NextApiRequest, NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../types/next-auth";
import withAuth from "../../../middleware/withAuth";
import isOwner from "../../../middleware/isOwner";
import { z } from "zod";
import HttpCodes from "http-status-codes";
import getQueryItem from "../../../lib/getQueryItem";
import { v4 } from "uuid";

const router = nextConnect({
  onError: (err, req: NextApiRequest, res: NextApiResponse, next) => {
    console.error(err);
    res.status(500).json(err);
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
router.use(withAuth);

const appendWordSchema = z.object({
  word: z.string(),
});

router.post(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const checkAppendWord = appendWordSchema.safeParse(req.query);
  if (!checkAppendWord.success) {
    res.status(HttpCodes.BAD_REQUEST).json(HttpCodes.getStatusText(HttpCodes.BAD_REQUEST));
    return;
  }

  const word = await prisma?.word.create({
    data: {
      ar: getQueryItem(req.query.word),
      userId: req.session.id,
      id: v4(),
    },
  });

  return res.json(word);
});

export default router;
