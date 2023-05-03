import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";
import butters from "a-promise-wrapper";
import prisma from "@db";
import validateZodSchema from "@backend/utils/validate.zod";
import Codes from "http-status-codes";

const route = nextConnect();

const queryUser = z.object({
    query: z
        .object({
            _email: z.string().email(),
            _userId: z.string().uuid(),
        })
        .partial()
        .refine((args) => (args._email && args._userId), "Only One is needed")
        .refine((args) => {
            if (!args._email && !args._userId) {
                return false;
            }
        }, "one is Required"),
});

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(queryUser, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);

    if (Input.query._email) {
    }
    const user = await butters(
        prisma.user.findUnique({
            where: {},
        })
    );
});

export default route;
