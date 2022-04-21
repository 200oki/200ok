import { Score } from "../db"; 
const crypto = require('crypto');

class ScoreService {
  static async addScore({ nickname, score }) {
    const id = crypto.randomUUID([])
    const newScore = { 
      id, 
      nickname, 
      score 
    };
    const createdScore = await Score.create({ newScore });
    return createdScore;
  }

  static async getUserRank({ id }) {
    const userRank = await Score.findUserRank({ id });
    return userRank;
  }

  static async getRanklist() {
    const topRanklist = await Score.findTopRank();
    return topRanklist;
  }
}


export { ScoreService };