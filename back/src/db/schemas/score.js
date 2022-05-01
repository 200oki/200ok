import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

/**
 * @swagger
 *   components:
 *    schemas:
 *      Scores:
 *        type: object
 *        required:
 *          - id
 *          - nickname
 *          - score
 *        properties:
 *          id:
 *            type: string
 *          nickname:
 *            type: string
 *            description: "게임한 유저 닉네임"
 *          score:
 *            type: number
 *            description: "유저 점수"
 *        example:
 *          id: 3fc6bc8f-d0d2-454b-916a-ebe4b9d7e01b
 *          nickname: test4
 *          score: 5
 */
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
  },
  {
    timestamps: true,
  }
);

const ScoreModel = model("Score", ScoreSchema);

export { ScoreModel };
