import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../../../types/next-auth";
import withAuth from "../../../../../middleware/withAuth";
import isOwner from "../../../../../middleware/isOwner";
import upload from "../../../../../middleware/upload";

const router = nextConnect();
router.use(upload.single("clip"));
router.post(async (req: RequestWithSession & {
    file: any
}, res: NextApiResponse, next) => {
  
  return res.json(req.file);
});

export default router;
