import { Schema, model } from "mongoose";

/** Schema representing an ranking.
 *
 * @field {uuid} id
 * @field {String} nickname
 * @field {Number} score
 * @field {Number} rank
 * 
 **/
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