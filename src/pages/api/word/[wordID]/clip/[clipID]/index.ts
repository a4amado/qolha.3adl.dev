import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../../../../types/next-auth";
import withAuth from "../../../../../../middleware/withAuth";
import isOwner from "../../../../../../middleware/isOwner";

const router = nextConnect();

router.get(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const word = await prisma?.word.findMany({
    select: { ar: true, en: true, clips: true },
    orderBy: {
      clips: {
        _count: "desc",
      },
    },
    take: 1,
  });

  return res.json(word);
});

export default router;
