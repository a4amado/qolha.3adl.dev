import ValidateInput from "@backend/utils/validate.yup";
import prisma from "@backend/db";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const route = nextConnect();
import { z } from "zod";
import butters from "a-promise-wrapper";
import Codes from "http-status-codes";

const Schema$verifyAccount = z.object({
    query: z.object({
        userID: z.string().uuid(),
        code: z.string().uuid(),
    }),
});

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$verifyAccount, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    const getAccount = await butters(
        prisma.user.findUnique({
            where: {
                id: Input.query.userID,
            },
            select: {
                id: true,
                account: true,
                emailVerified: true,
                code: true,
            },
        })
    );

    if (getAccount.error) {
        console.error(getAccount.error)
        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Error While Verifing your account"]
        });
    }
    if (getAccount.data?.emailVerified) {

        return res.status(Codes.OK).send({
            message: ["Email Already Verified"]
        });
    }
    if (getAccount.data?.code != Input.query.code) return res.status(Codes.BAD_REQUEST).send({
        message: `Wrong code ${Input.query.code}`
    });

    const verifyAccount = await butters(
        prisma.user.update({
            where: {
                id: Input.query.code,
            },
            data: {
                emailVerified: new Date(),
                code: "",
            },
        })
    );
    if (verifyAccount.error) {
        console.error(verifyAccount.error)
        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Error While Verifing your account"]
        });
    }

    return res.status(Codes.OK).send("Account Verified Successfully");
});

export default route;
