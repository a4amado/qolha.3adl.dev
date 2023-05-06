import nextConnect from "next-connect";

const route = nextConnect();

import Codes from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((reso) => {
        setTimeout(() => {
            res.status(Codes.OK).json(
                Array.from({ length: 10 }, () => ({
                    ar: "أنا",
                    id: randomUUID(),
                }))
            );
        }, 3000);
    });
});

export default route;
