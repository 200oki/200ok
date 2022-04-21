import { Score } from "../db/index.js"; 
import crypto from "crypto";

class ScoreService {
  static async addScore({ nickname, score }) {
    const id = crypto.randomUUID()
    const newScore = { 
      id, 
      nickname, 
      score,
    };
    const createdScore = await Score.create({ newScore });
    return createdScore;
  }

  static async getUserRank({ id }) {
    const userRank = await Score.findUserRank({ id });
    return userRank;
  }

  static async getRankList() {
    const topRankList = await Score.findTopRank();
    return topRankList;
  }
}


export { ScoreService };