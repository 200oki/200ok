import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const CommentSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    villager: {
      type: String,
    },
    location: {
      type: String,
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
