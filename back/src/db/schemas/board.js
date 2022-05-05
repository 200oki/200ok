import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const BoardSchema = newSchema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    images: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
