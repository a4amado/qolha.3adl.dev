import ValidateInput from "@backend/utils/validate.yup";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import Codes from "http-status-codes";
import butters from "a-promise-wrapper";
import prisma from "@backend/db";
import { Schema$API$DeleteClip } from "@schema/clip/delete-clip";

const route = nextConnect();

route.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$DeleteClip, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    const deletedClip = await butters(
        prisma.clip.delete({
            where: {
                id: Input.query.clipId,
            },
        })
    );
    if (deletedClip.error) return res.status(Codes.INTERNAL_SERVER_ERROR).end();
    res.status(Codes.OK).send(deletedClip.data);
});

export default route;
