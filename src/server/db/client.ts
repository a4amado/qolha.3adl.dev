import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  ar: String,
  en: String,
  audios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Audio" }],
});
export const Word =
  mongoose.models["Word"] || mongoose.model("Word", WordSchema);

const WordToReviewSchema = new mongoose.Schema({
  ar: String,
  en: String,
  audios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Audio" }],
});

export const WordToReview =
  mongoose.models["WordToReview"] ||
  mongoose.model("WordToReview", WordToReviewSchema);

const AudioSchema = new mongoose.Schema({
  path: String,
  word: { type: mongoose.Schema.Types.ObjectId, ref: "Word" },
});
export const Audio =
  mongoose.models["Audio"] || mongoose.model("Audio", AudioSchema);

const AudioToReviewSchema = new mongoose.Schema({
  path: String,
  word: { type: mongoose.Schema.Types.ObjectId, ref: "Word" },
});
export const AudioToReview =
  mongoose.models["AudioToReview"] ||
  mongoose.model("AudioToReview", AudioToReviewSchema);
