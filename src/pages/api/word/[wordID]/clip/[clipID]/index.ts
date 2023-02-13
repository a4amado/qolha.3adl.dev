import { NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../../../../types/next-auth";
import withAuth from "../../../../../../middleware/withAuth";
import isOwner from "../../../../../../middleware/isOwner";
import HttpCodes from "http-status-codes"
import { z} from "zod";
import { createReadStream } from "fs";
import path from "path";
import getQueryItem from "../../../../../../lib/getQueryItem";
const router = nextConnect();
const streamClipSchema = z.object({
  clipID: z.string().cuid(),
  wordID: z.string().cuid(),
  clipPath: z.string().uuid(),
  
})
router.get(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const clipCheck = streamClipSchema.safeParse(req.query);
  if (!clipCheck.success) {
    res.status(HttpCodes.BAD_REQUEST).json(HttpCodes.getStatusText(HttpCodes.BAD_REQUEST));
    return;
  }
  const clip = createReadStream(path.join(process.cwd(), "files", "clips", getQueryItem(req.query.clipPath)));
  clip.on("error", (error) => {
    res.status(HttpCodes.BAD_REQUEST).send(error);
  })
  clip.on("end", () => {
    res.status(HttpCodes.OK).send(HttpCodes.getStatusText(HttpCodes.OK));
  })
  clip.pipe(res);

});

export default router;
