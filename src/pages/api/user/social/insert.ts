import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import butters from "a-promise-wrapper";
import prisma from "@backend/db";
import ValidateInput from "@backend/utils/validate.yup";
import Codes from "http-status-codes";
import { Schema$API$InsertSocialMedia } from "@schema/social/insert";
import withAuth from "@backend/middleware/withAuth";

const route = nextConnect();

route.get(withAuth, async (req: NextApiRequest & { user: { id: string; role: string } }, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$InsertSocialMedia, req);
    if (errors.length > 0) {
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });
    }
    const media = await butters(
        prisma.socialMedia.create({
            data: {
                userId: req.user.id,
                username: Input.body.username,
                site: Input.body.site,
            },
            select: {
                site: true,
                username: true,
            },
        })
    );

    if (media.error) {
        return res.status(Codes.BAD_REQUEST).send({
            message: ["Internal Server Error"],
        });
    }
});

export default route;
