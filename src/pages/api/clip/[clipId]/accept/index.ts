import ValidateInput from "@backend/utils/validate.yup";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import Codes from "http-status-codes";
import butters from "a-promise-wrapper";
import prisma from "@backend/db";
import { Schema$API$AcceptClip } from "@schema/clip/accept-clip";

const route = nextConnect();

route.patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$AcceptClip, req);
    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });
    const acceptedClip = await butters(
        prisma.clip.update({
            where: {
                id: Input.query.clipId,
            },
            data: {
                accept: true,
            },
        })
    );
    if (acceptedClip.error) {
        console.error(acceptedClip.error);

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Internal Server Error"],
        });
    }
    res.status(Codes.OK).send(acceptedClip.data);
});

export default route;
