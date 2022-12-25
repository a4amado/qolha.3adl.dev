import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import * as yup from "yup";
import { AudioToReview, Word } from "../../../../server/db/client";

const appendAudioSchema = yup.object().shape({
  path: yup.string().required().uuid(),
  word_id: yup.string().required(),
});

export default nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await appendAudioSchema.validate(req.body);
    } catch (error) {
      res.json({ msg: "invalied inputs" });
      res.status(500);
    }

    try {
      const newAudio = new AudioToReview({
        path: req.body.path,
        word: req.body.word_id,
      });
      const saveNewAudio = await newAudio.save();

      // @ts-ignore next-line
      const getWord = await Word.findOne({
        _id: req.body.word_id,
      });

      getWord.audios.push(saveNewAudio);
      await getWord.save();

      res.json(getWord);
    } catch (error) {
      console.log(error);
    }
  }
);
