import prisma from "@backend/db";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import butters from "a-promise-wrapper";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ValidateInput from "@backend/utils/validate.yup";
import withAuth from "@backend/middleware/withAuth";
import verifyRole from "@backend/middleware/verifyRole";
import { Schema$API$UpdateRole } from "@schema/user/update-role";

const route = nextConnect();

route.post(withAuth, verifyRole(["owner"]), async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$UpdateRole, req);
    if (errors.length > 0)
        return res.status(StatusCodes.BAD_REQUEST).send({
            mesage: errors,
        });

    const update_role = await butters(
        prisma.user.update({
            data: {
                role: Input.body.role,
            },
            where: {
                id: Input.query.userId,
            },
            select: {
                role: true,
                id: true,
            },
        })
    );

    if (update_role.error)
        return res.status(StatusCodes.BAD_REQUEST).send({
            mesage: [ReasonPhrases.BAD_REQUEST],
        });

    res.status(StatusCodes.OK).send(update_role.data);
});

export default route;
