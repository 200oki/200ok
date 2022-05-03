import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const csmSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name_ko: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  image_photo: {
    type: String,
    required: true,
  },
});

const CsmModel = model("csms", csmSchema);

export { CsmModel };
