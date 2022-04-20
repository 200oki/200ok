import { Schema, model } from "mongoose";

const ScoreSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ScoreModel = model("Score", ScoreSchema);

export { ScoreModel };