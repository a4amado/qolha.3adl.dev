import prisma from "@backend/db";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import butters from "a-promise-wrapper";
import Codes from "http-status-codes";
import ValidateInput from "@backend/utils/validate.yup";
import { Schema$API$BanUser } from "@schema/user/ban-user";

const route = nextConnect();

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$BanUser, req);
    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });

    const bannedUser = await butters(
        prisma.user.update({
            where: {
                id: Input.query.userId,
            },
            data: {
                banned: new Date()
            }
        })
    );

    const s = await butters(prisma.session.deleteMany({
        where: {
            userId: Input.query.userId
        }
    }))

    if (bannedUser.error) {

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: "Something wrong while deleting the Account",
        });
    }

    res.status(Codes.OK).send(bannedUser.data);
});

export default route;
