import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../../../../../types/next-auth";
import withAuth from "../../../../../../../middleware/withAuth";
import isOwner from "../../../../../../../middleware/isOwner";
import { z } from "zod";
import HttpCodes from "http-status-codes";
import getQueryItem from "../../../../../../../lib/getQueryItem";

const router = nextConnect();

const appendRateSchema = z.object({
  clipID: z.string().cuid(),
  rate: z.enum(["0", "50", "100"]),
  wordID: z.string().cuid(),
});

router.use(withAuth);

router.post(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const CheckAppendRateSchema = appendRateSchema.safeParse(req.query);

  if (!CheckAppendRateSchema.success) {
    res
      .status(HttpCodes.BAD_REQUEST)
      .json(HttpCodes.getStatusText(HttpCodes.BAD_REQUEST));
    return;
  }

  const clipRate = await prisma?.rate.findFirst({
    where: {
      AND: {
        clipID: getQueryItem(req.query.clipID),
        userID: req.session.id,
      },
    },
  });

  const newClipRate = await prisma?.rate.upsert({
    create: {
      clipID: getQueryItem(req.query.clipID),
      userID: req.session.id,
      rate: Number(getQueryItem(req.query.rate)),
    },
    update: {
      rate: Number(getQueryItem(req.query.rate)),
    },
    where: {
      id: clipRate?.id || "",
    },
  });

  return res.json(newClipRate);
});

export default router;
