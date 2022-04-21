import mongoose from "mongoose";
import crypto from "crypto";

const Schema = mongoose.Schema;
const model = mongoose.model;

const CommentSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  villager: {
    type: String,
    unique: true,
  },
  comment: {
    type: [String],
  },
});

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
