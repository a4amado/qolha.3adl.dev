import { NextApiRequest, NextApiResponse, NextConfig } from "next/types";
import nextConnect from "next-connect";
import { RequestWithSession } from "../../../types/next-auth";
import withAuth from "../../../middleware/withAuth";
import upload from "../../../middleware/upload";
import getQueryItem from "../../../lib/getQueryItem";
import { v4 } from "uuid";

const router = nextConnect({
  onError: (err, req: NextApiRequest, res: NextApiResponse, next) => {
    console.error(err);
    res.status(500).json(err);
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

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

router.use(upload.single("clip"));

router.post(
  async (
    req: RequestWithSession & {
      file: File;
    },
    res: NextApiResponse,
    next
  ) => {
    console.log(req.file);

    // if (!isWordIdValid) {
    //   res
    //     .status(HttpStatus.BAD_REQUEST)
    //     .send(HttpStatus.getStatusText(HttpStatus.BAD_REQUEST));
    //   return;
    // }

    const word = await prisma?.clip.create({
      data: {
        path: req.file.filename,
        userID: req.session.id,
        wordID: getQueryItem(req.query.wordID),
        id: v4(),
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
