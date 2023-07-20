import prisma from "@db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function ss(req: NextApiRequest, res: NextApiResponse) {
    res.json(await prisma.user.findUnique({
        where: {
             email: "a4addel@gmail.com"
        }
    }))
}