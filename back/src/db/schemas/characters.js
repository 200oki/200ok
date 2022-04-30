import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const characterSchema = new Schema({
  name_ko: {
    type: String,
    requre: true,
  },
  count: {
    type: Number,
    requre: true,
  },
});

const CharacterModel = model("Comment", characterSchema);

export { CharacterModel };
