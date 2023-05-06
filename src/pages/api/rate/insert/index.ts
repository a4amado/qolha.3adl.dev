import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import butters from "a-promise-wrapper";
import prisma from "@backend/db";
import ValidateInput from "@backend/utils/validate.yup";
import Codes from "http-status-codes";
import { Schema$API$InsertRate } from "@schema/rate/insert-rate";

const route = nextConnect();

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$InsertRate, req);

    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });
    const clipRate = await butters(
        prisma.rate.upsert({
            create: {
                clipId: Input.query.clipId,
                // @ts-ignore
                userId: req.session.id,
                rate: String(Input.query.rate),
            },
            update: {
                rate: String(Input.query.rate),
            },
            where: {
                clipId_userId: {
                    clipId: Input.query.clipId,
                    // @ts-ignore
                    userId: req.session.id,
                },
            },
        })
    );
    if (clipRate.error) {
        console.error(clipRate.error);

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error",
        });
    }
    res.status(Codes.OK).send(clipRate);
});

export default route;
