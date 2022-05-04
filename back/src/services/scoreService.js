import { Score } from "../db/index.js"; 
import crypto from "crypto";

class ScoreService {
  /** 점수 저장 함수
   * 
   * @param {String} nickname - 유저 닉네임
   * @param {Number} score - 게임 점수
   * @return {Object}
  */
  static async addScore({ nickname, score }) {
    const id = crypto.randomUUID()
    const newScore = { 
      id, 
      nickname, 
      score,
    };
    const createdScore = await Score.create({ newScore });
    const userRankScore = await Score.findUserRank({ id });
    return userRankScore;
  }

  /** 현재 유저 랭크 반환 함수
   * 
   * @param {String} id - 유저 id
   * 
   * @return {Object}
  */
  static async getUserRank({ id }) {
    const userRank = await Score.findUserRank({ id });
    return userRank;
  }

  /** 상위 유저들의 스코어 오브젝트 반환 함수
   * 
   * @return {Object} 
  */
  static async getRankList() {
    const topRankList = await Score.findTopRank();
    return topRankList;
  }
}


export { ScoreService };