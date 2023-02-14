import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../types/next-auth";
import withAuth from "../../../middleware/withAuth";
import isOwner from "../../../middleware/isOwner";
import getQueryItem from "../../../lib/getQueryItem";
import { z } from "zod";
import HttpStatus from "http-status-codes";
const router = nextConnect();

const listClipsSchema = z.object({
  query: z.object({
    wordID: z.string().uuid(),
  }),
});

router.get(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const ChecklistClipsSchema = listClipsSchema.safeParse(req);

  if (!ChecklistClipsSchema.success) {
    res.status(HttpStatus.NOT_ACCEPTABLE).json(ChecklistClipsSchema.error.errors);
    return;
  }

  const clips = await prisma?.word.findFirst({
    where: {
      id: getQueryItem(req.query.wordID),
    },
    select: {
      ar: true,

      clips: {
        select: {
          createBy: {
            select: {
              name: true,
            },
          },
          id: true,
          path: true,
        },
        take: 15,
      },
    },
  });

  res.status(HttpStatus.OK).json(clips);
});

export default router;
