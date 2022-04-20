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

  static async findTopRank() {
    // top 몇 위까지 뽑아낼건지
    let top = 3;
    const rankList = await ScoreModel.find().sort({ "score": -1 }).limit(top);
    
    return rankList
  }
}


export { Score };