import { ScoreModel } from "../schemas/score.js";

class Score {
  /** 스코어 오브젝트 생성 함수
   * 
   * @param {Object} NewScore - 생성할 스코어 데이터 오브젝트 
   * @return {Object}
   */
  static async create({ newScore }) {
    const createNewScore = await ScoreModel.create(newScore);
    return createNewScore;
  }
  
  /** 아이디가 일치하는 유저 순위 반환 함수
   * 
   * @param {String} id - 유저 id 
   * @returns {Object} - 
   */
  static async findUserRank({ id }) {
    const rankList = await ScoreModel.aggregate([
      {
        $setWindowFields: {
          sortBy: { score: -1 },
          output: {
            rank: {
              $rank: {}
            }
          }
        }
      }
    ]);

    const userRank = rankList.findIndex(i => i.id == id);
    
    return rankList[userRank];
  }

  /** 게임 점수가 높은 유저 리스트 반환 함수
   * 
   * @returns {[Object]} - top명의 오브젝트 리스트 반환
   */
  static async findTopRank() {
    // top 몇 위까지 뽑아낼건지
    let top = 3;
    const rankList = await ScoreModel.aggregate([
      {
        $setWindowFields: {
          sortBy: { score: -1 },
          output: {
            rank: {
              $rank: {}
            }
          }
        }
      }
    ]);
    
    return rankList.slice(0, top);
  }
}


export { Score };