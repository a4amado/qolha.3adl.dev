import prisma from "@db";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import butters from "a-promise-wrapper"
import Codes from "http-status-codes";
import {z} from "zod"
import validateZodSchema from "@backend/utils/validate.zod";

const route = nextConnect();

const DeleteUser = z.object({
    query: z.object({
        userId: z.string().uuid()
    })
})


route.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(DeleteUser, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);


    const deletedAccount = await butters(
        prisma.user.delete({
            where: {
                id: Input.query.userId,
            },
        })
    );
    
    if (deletedAccount.error) return res.status(Codes.INTERNAL_SERVER_ERROR).send(Codes.getStatusText(Codes.INTERNAL_SERVER_ERROR));
    
    res.status(Codes.OK).send(deletedAccount.data);
})


export default route;