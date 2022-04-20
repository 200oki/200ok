import { ScoreModel } from "../schemas/score";

class Score {
  static async create({ newScore }) {
    const createNewScore = await ScoreModel.create(newScore);
    return createNewScore;
  }
}


export { Score };