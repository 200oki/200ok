import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

/**
 * @swagger
 *   components:
 *    schemas:
 *      Commnets:
 *        type: object
 *        required:
 *          - id
 *          - vaillager
 *          - location
 *          - nickname
 *          - comment
 *        properties:
 *          id:
 *            type: string
 *          villager:
 *            type: string
 *            description: "주민 이름"
 *          location:
 *            type: string
 *            description: "위치"
 *          nickname:
 *            type: string
 *            description: "댓글 단 유저의 닉네임"
 *          comment:
 *            type: string
 *            description: "댓글 내용"
 *        example:
 *          id : e9840a4f-0f1e-40c7-99dd-b351820ec842
 *          villager: 아그네스
 *          location: recommendation
 *          nickname: 고구마
 *          comment: 댓글입니다.
 */

const CommentSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    villager: {
      type: String,
      index: true,
    },
    location: {
      type: String,
      required: true,
      index: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 닉네임 중복 허용
// Date 넣어주기

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
