import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const PostSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    nickname: {
      type: String,
    },
    images: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = model("posts", PostSchema);

export { PostModel };
