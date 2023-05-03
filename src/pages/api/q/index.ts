import nextConnect from "next-connect";

const route = nextConnect();

import Codes from "http-status-codes";
import { v4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import {z} from "zod"
import validateZodSchema from "@backend/utils/validate.zod";

const Query = z.object({
    query: z.object({
        q: z.string()
    })
})

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = validateZodSchema(Query, req);
    if (errors.length > 0) return res.status(Codes.BAD_REQUEST).send(errors);
    return new Promise((reso) => {
        setTimeout(() => {
            res.status(Codes.OK).json(
                Array.from({ length: 10 }, () => ({
                    ar: "أنا",
                    id: v4(),
                }))
            );
        }, 3000);
    });
})

export default route;