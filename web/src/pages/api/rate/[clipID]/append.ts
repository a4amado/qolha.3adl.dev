import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../../types/next-auth";
import withAuth from "@middleware/withAuth";
import isOwner from "@middleware/verifyRole";
import { z } from "zod";
import HttpCodes from "http-status-codes";
import getQueryItem from "@utils/getQueryItem";
import { v4 } from "uuid";
import prisma from "@utils/prismadb";

const router = nextConnect();

const appendRateSchema = z.object({
  query: z.object({
    clipID: z.string().uuid(),
  }),
  body: z.object({
    rate: z.enum(["0", "50", "100"]),
  }),
});

router.use(withAuth);

router.post(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const CheckAppendRateSchema = appendRateSchema.safeParse(req);

  if (!CheckAppendRateSchema.success) {
    res.status(HttpCodes.BAD_REQUEST).json(CheckAppendRateSchema.error);
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
      rate: Number(getQueryItem(req.body.rate)),
      id: v4(),
    },
    update: {
      rate: Number(getQueryItem(req.body.rate)),
    },
    where: {
      id: clipRate?.id || "",
    },
  });

  return res.json(newClipRate);
});

export default router;
