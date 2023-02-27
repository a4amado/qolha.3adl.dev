import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../types/next-auth";
import withAuth from "@middleware/withAuth";
import isOwner from "@middleware/verifyRole";
import prisma from "@utils/prismadb";

const router = nextConnect();

router.use(withAuth);

router.get(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const word = await prisma?.word.findFirst({
    select: {
      ar: true,
      id: true,
      createBy: { select: { name: true, id: true } },
    },
    orderBy: {
      clips: {
        _count: "asc",
      },
    },
    take: 1,
  });

  return res.json(word);
});

export default router;
