import prisma from "@db";
import { NextApiResponse } from "next";

export default async function ss(req: Request, res: NextApiResponse) {
    res.send(await prisma.user.findFirst({
        where: {
            email: "a4addel@gmail.com"
        }
    }))
}