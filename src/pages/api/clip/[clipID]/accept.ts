import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../../types/next-auth";
import withAuth from "../../../../middleware/withAuth";
import isOwner from "../../../../middleware/isOwner";

import { z } from "zod";
import HttpCodes from "http-status-codes";
import getQueryItem from "../../../../lib/getQueryItem";

const router = nextConnect();

const appendRateSchema = z.object({
  clipID: z.string().uuid(),
});

router.use(withAuth);
router.use(isOwner);

router.post(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const CheckAppendRateSchema = appendRateSchema.safeParse(req.query);

  if (!CheckAppendRateSchema.success) {
    res.status(HttpCodes.BAD_REQUEST).json(HttpCodes.getStatusText(HttpCodes.BAD_REQUEST));
    return;
  }

  const clipStatus = await prisma?.clip.update({
    where: {
      id: getQueryItem(req.query.clipID),
    },
    data: {
      accepted: true,
      rejected: false,
    },
  });

  return res.json(clipStatus);
});

export default router;
