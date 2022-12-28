import nextConnect from "next-connect";
import * as jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import { compareSync } from "bcrypt";
import * as yup from "yup";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const AdminSchema = new mongoose.Schema({
  email: String,
  hash: String,
  role: String,
});
const Admin = mongoose.models["Admin"] || mongoose.model("Admin", AdminSchema);
mongoose.set('strictQuery', false);
export default nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
      });

      await schema.validate(req.body);

      await mongoose.connect(process.env.DATABASE_URL);

      // @ts-ignore next-line
      const admin = await Admin.findOne({ email: req.body.email || "" });

      if (!admin) {
        throw "No Admin";
      }

      const ss = await compareSync(req.body.password, admin.hash);
      if (!ss) throw "Wrong Password or Email";

      const token = jsonwebtoken.sign(
        {
          role: "admin", // admin.role
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "1h" }
      );
      res.setHeader(
        "set-cookie",
        serialize("token", token, { httpOnly: true, path: "/" })
      )

      res.json("Done");
    } catch (error) {
      console.log(error);

      res.json(error);
    }
  }
);
