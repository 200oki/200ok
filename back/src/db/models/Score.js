import { ScoreModel } from "../schemas/score";

class Score {
  static async create({ newScore }) {
    const createNewScore = await ScoreModel.create(newScore);
    return createNewScore;
  }
  
  // 본인의 랭크 찾기
  // 수정 필요
  static async findUserRank({ id }) {
    const userScore = await ScoreModel.sort({ "score": -1 }).findOne({ id });

    return userScore;
  }
}


export { Score };