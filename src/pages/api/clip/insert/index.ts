import Codes from "http-status-codes";

import butters from "a-promise-wrapper";
import prisma from "@backend/db";

import ValidateInput from "@backend/utils/validate.yup";
import nextConnect from "next-connect";

import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import withAuth from "@backend/middleware/withAuth";
import MicroFormidable from "@backend/middleware/MicroFormidable";
import { join } from "path";
import { randomUUID } from "crypto";
import { Schema$API$InsertClip } from "@schema/clip/insert-clip";

const route = nextConnect();

const uploader = new MicroFormidable({
    uploadDir: join(process.cwd(), "files", "clips"),
    filename: () => `clip-from-user${randomUUID()}`,
});

// @ts-ignore
route.post(withAuth, uploader.single("clip"), async (req: NextApiRequest & { clip: Exclude<File, File[] | undefined> }, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$InsertClip, req);
    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });

    const clip = await butters(
        prisma.clip.create({
            data: {
                // @ts-ignore

                clipName: req.clip.newFilename,
                // @ts-ignore
                userId: req.user.id,

                wordId: Input.query.wordId,
                accept: false,
                reject: false,
            },
        })
    );

    if (clip.error) {
        console.error(clip.error);

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Internal Server Error"],
        });
    }

    return res.status(Codes.OK).send(clip);
});

export default route;
export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};
