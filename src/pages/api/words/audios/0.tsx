import axios from "axios";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import * as yup from "yup";
import { Word } from "../../../../server/db/client";
    mongoose.connect(process.env.DATABASE_URL);

export default nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (mongoose.connections.length > 0) {} else {
        mongoose.connect(process.env.DATABASE_URL);
      }
      // @ts-ignore next-line
       const word = await Word.find().sort([["audios", 1]]).limit(1);
      console.log(word);

      res.json(word);
    } catch (error) {
      console.log(error);

      res.json({
        error: error,
      });
    }
  }
);
