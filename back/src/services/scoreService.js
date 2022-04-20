import { Score } from "../db"; 
var crypto = require('crypto');

class ScoreService {
  static async addScore({ nickname, score }) {
    const id = crypto.randomUUID([])
    const newScore = { id, nickname, score };

    const createdNewScore = await Score.create({ newScore });

    return createdNewScore;
  }
}


export { ScoreService };