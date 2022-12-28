import nextConnect from "next-connect";
import * as jsonwebtoken from "jsonwebtoken";
import * as yup from "yup";
import { NextApiRequest, NextApiResponse } from "next";

export default nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
      });

      await schema.validate(req.body);

      const isAdmin = req.body.email == process.env.ADMIN_EMAIL;
      const isPassword = req.body.password == process.env.ADMIN_PASSWORD;

      if (!isAdmin || !isPassword) throw "Wrong Password or Email";

      const token = jsonwebtoken.sign(
        {
          role: "admin", // admin.role
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "1h" }
      );
      res.setHeader("set-cookie", `token=${token}; httpOnly; path=/; secure`);

      res.json("Done");
    } catch (error) {
      res.json(error);
    }
  }
);
