import prisma from "@backend/db";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import butters from "a-promise-wrapper";
import Codes from "http-status-codes";
import ValidateInput from "@backend/utils/validate.yup";
import { Schema$API$DeleteUser } from "@schema/user/delete-user";

const route = nextConnect();

route.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$DeleteUser, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);

    const deletedAccount = await butters(
        prisma.user.delete({
            where: {
                id: Input.query.userId,
            },
        })
    );

    if (deletedAccount.error) {
        console.error(deletedAccount.error);
        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: "Something wrong while deleting the Account",
        });
    }

    res.status(Codes.OK).send(deletedAccount.data);
});

export default route;
