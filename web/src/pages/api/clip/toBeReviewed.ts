import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../types/next-auth";
import withAuth from "@middleware/withAuth";
import isOwner from "@middleware/verifyRole";
import getQueryItem from "@utils/getQueryItem";
import { z } from "zod";
import HttpStatus from "http-status-codes";
import prisma from "@utils/prismadb";

const router = nextConnect();

// router.use(withAuth);
// router.use(isOwner);

router.get(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const clips = await prisma?.clip.findMany({
    where: {
      accepted: false,
      rejected: false,
    },
    select: {
      word: {
        select: {
          ar: true,
          id: true,
        },
      },
      id: true,
      path: true,
    },
    take: 5,
  });

  res.status(HttpStatus.OK).json(clips);
});

export default router;
