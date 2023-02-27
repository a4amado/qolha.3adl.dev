import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { v4 } from "uuid";
import { z } from "zod";
import HttpCodes from "http-status-codes";
import bcrypt from "bcrypt";
import prisma from "@utils/prismadb";

import sendTestMail from "@utils/mailersend";
import { User } from "next-auth";

const router = nextConnect({
  // TODO
});

// @ts-ignore
const p = PrismaAdapter(prisma);

export const signUpSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(10),
    vPassword: z.string().min(10),
  })
  .superRefine(({ vPassword, password }, ctx) => {
    if (vPassword != password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const s = signUpSchema.safeParse(req.body);
  if (!s.success) return res.status(HttpCodes.UNPROCESSABLE_ENTITY).json(s.error.flatten());

  const code = Math.random() * 10;

  let user: User | undefined = undefined;
  const hash = bcrypt.hashSync(req.body.password, 10);
  try {
    user = await prisma?.user.create({
      data: {
        email: req.body.email,
        emailVerified: null,
        name: req.body.username,
        code: code.toString(),
      },
    });

    await p.linkAccount({
      provider: "credentials",
      type: "credentials",
      providerAccountId: v4(),
      userId: user?.id || "",
      hash,
    });
  } catch (e) {
    res.status(HttpCodes.UNPROCESSABLE_ENTITY).json({ errors: ["Email Already registerd"] });
  }

  // @ts-ignore
  await sendTestMail({ email: user?.email, username: user?.name, code, userID: user?.id });
  res.status(HttpCodes.OK).send(HttpCodes.getStatusText(HttpCodes.OK));
});

export default router;
