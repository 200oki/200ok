const Schema = mongoose.Schema;
const model = mongoose.model;

/** Schema representing ranking.
 *
 * @field {uuid} id
 * @field {String} nickname
 * @field {Number} score
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
  },
  {
    timestamps: true,
  },
);

const ScoreModel = model("Score", ScoreSchema);

export { ScoreModel };