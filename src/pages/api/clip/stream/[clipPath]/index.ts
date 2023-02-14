import { NextApiRequest, NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../../../types/next-auth";

import HttpCodes from "http-status-codes";
import { z } from "zod";
import { createReadStream } from "fs";
import path from "path";
import getQueryItem from "../../../../../lib/getQueryItem";
const router = nextConnect({
  onError: (err, req: NextApiRequest, res: NextApiResponse, next) => {
    console.error(err);
    res.status(500).json(err);
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
const streamClipSchema = z.object({
  clipPath: z.string().uuid(),
});
router.get(async (req: RequestWithSession, res: NextApiResponse, next) => {
  const clipCheck = streamClipSchema.safeParse(req.query);
  if (!clipCheck.success) {
    res.status(HttpCodes.BAD_REQUEST).json(HttpCodes.getStatusText(HttpCodes.BAD_REQUEST));
    return;
  }
  const clip = createReadStream(path.join(process.cwd(), "files", "clips", getQueryItem(req.query.clipPath)));
  clip.on("error", (error) => {
    res.status(HttpCodes.BAD_REQUEST).send(error);

    return;
  });
  clip.pipe(res);
});

export default router;
