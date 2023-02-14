/**
 * get Word
 */

import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../../types/next-auth";
import withAuth from "../../../../middleware/withAuth";
import isOwner from "../../../../middleware/isOwner";
import { z } from "zod";
import HttpCode from "http-status-codes";
import getQueryItem from "../../../../lib/getQueryItem";

const router = nextConnect();

const QueryWordSchema = z.object({
  query: z.object({
    wordID: z.string().uuid("Invalid wordID"),
  }),
});

router.get(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const CheckQueryWordSchema = QueryWordSchema.safeParse(req);
  if (!CheckQueryWordSchema.success) return res.status(HttpCode.NOT_ACCEPTABLE).send(CheckQueryWordSchema.error.errors);

  const word = await prisma?.word.findUnique({
    where: {
      id: getQueryItem(req.query.wordID),
    },
    include: {
      clips: {
        take: 10,
      },
      createBy: true,
    },
  });

  res.status(HttpCode.OK).json({ word });
});

export default router;
