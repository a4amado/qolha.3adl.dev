import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import getQueryItem from "@utils/getQueryItem";
import prisma from "@utils/prismadb";
import HttpCodes from "http-status-codes";

export default nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const vUser = await prisma.user.findFirst({
    where: {
      id: getQueryItem(req.body.userID),
      code: getQueryItem(req.query.code),
    },
  });
  if (!vUser?.id) {
    return res.status(HttpCodes.NOT_ACCEPTABLE).send("Worong Verification Code");
  }

  await prisma.user.update({
    data: {
      emailVerified: new Date(),
    },
    where: {
      id: vUser.id,
    },
  });
  res.redirect(301, "/auth");
});
