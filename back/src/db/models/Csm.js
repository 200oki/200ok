import { csmdata, CsmModel } from "../schemas/csm.js";
import { RequestError } from "../../utils/errors.js";
import * as status from "../../utils/status.js";
import crypto from "crypto";
class Csm {
  static async getCount({ id }) {
    const count = await CsmModel.aggregate([
      {
        $match: {
          id,
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return count;
  }

  static async upCount({ id }) {
    const up = await CsmModel.findOneAndUpdate({ id }, { $inc: { count: 1 } });
    return up;
  }

  static async totalCount() {
    const total = await CsmModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
        },
      },
    ]);
    return total;
  }

  /** 하드코드된 `csmdata` 테이블에서 유사한 캐릭터의 배열을 읽어 반환합니다.
   *
   * @arg {{id: string}} kwargs
   * @return {any[]} - 유사한 캐릭터들이 비슷한 순서로 정렬된 배열을 반환합니다.
   *    구조는 다음과 같습니다.
   *    ```js
   *    [ { id, distance, character: char, }, ]
   *    ```
   */
  static getSimilarCharsOf({ id }) {
    if (!(id in csmdata)) {
      throw new RequestError(
        {
          status: status.STATUS_404_NOTFOUND,
        },
        `{${id}} is either non-existent or not csm'able`
      );
    } else {
      return csmdata[id];
    }
  }

  static async getRank() {
    const rank = await CsmModel.find().sort({ count: -1 }).limit(3).lean();
    return rank;
  }
}

export { Csm };
