import { NextApiResponse, NextConfig } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../../../types/next-auth";
import withAuth from "../../../../../middleware/withAuth";
import isOwner from "../../../../../middleware/isOwner";
import upload from "../../../../../middleware/upload";
import { number, z } from "zod";
import HttpStatus from "http-status-codes";
import { Result } from "antd";
import getQueryItem from "../../../../../lib/getQueryItem";

const router = nextConnect();

function isCUID(cuid: any) {
  const schema = z.string().cuid();
  const result = schema.safeParse(cuid);
  console.log(result);

  return result.success;
}

router.use(withAuth);

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

router.use(withAuth);

router.use(upload.single("clip"));

router.post(
  async (
    req: RequestWithSession & {
      file: File;
    },
    res: NextApiResponse,
    next
  ) => {
    const isWordIdValid = isCUID(req.query.wordID);

    if (!isWordIdValid) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(HttpStatus.getStatusText(HttpStatus.BAD_REQUEST));
      return;
    }

    const word = await prisma?.clip.create({
      data: {
        path: req.file.filename,
        userID: req.session.id,
        wordID: getQueryItem(req.query.wordID),
      },
    });

    return res.json(word);
  }
);

export default router;

export const config = {
  api: {
    bodyParser: false, // Defaults to true. Setting this to false disables body parsing and allows you to consume the request body as stream or raw-body.
    responseLimit: false, // Determines how much data should be sent from the response body. It is automatically enabled and defaults to 4mb.
  },
};
