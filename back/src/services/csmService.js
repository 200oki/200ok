import { Csm } from "../db/index.js";
import { Character } from "../db/index.js";
import { SortingHat } from "../utils/csmTools.js";

class CsmService {
  static async getCount({ id }) {
    const count = await Csm.getCount({ id });
    const totalList = await Csm.totalCount();
    const total = totalList[0].total;
    count[0]["total"] = total;
    const avg = ((count[0].count / count[0].total) * 100).toFixed(2);
    count[0]["avg"] = avg;
    const body = {
      success: true,
      payload: count[0],
    };
    return body;
  }

  static async upCount({ id }) {
    const up = await Csm.upCount({ id });
    const body = {
      id: up.id,
      uuid: up.uuid,
      name_ko: up.name_ko,
      image_photo: up.image_photo,
      count: up.count,
    };
    return body;
  }

  static async totalCount() {
    const totalList = await Csm.totalCount();
    const total = totalList[0].total;
    return total;
  }

  /** 하드코드된 `csmdata` 테이블에서 유사한 캐릭터의 배열을 읽어 반환합니다.
   *
   * @arg {{
   *  id: string,
   *  top?: number = 0
   *  bottom?: number = 0
   * }} kwargs
   *    - `top`과 `bottom`은 각각 유사도 상위/하위권에서 자를 숫자입니다.
   *    - `top`과 `bottom`이 모두 0이면 전체 유사도 배열을 반환합니다.
   *    - `top` 또는 `bottom` 중 하나가 지정되면 그 부분만 반환합니다.
   *    - 둘 모두가 지정되면 `[ ...top, ...bottom ]` 형식으로 반환합니다.
   *    - 어떤 경우에도 순서는 유사도 상위 -> 하위 순입니다.
   * @return {any[]} - 유사한 캐릭터들이 비슷한 순서로 정렬된 배열을 반환합니다.
   *    구조는 다음과 같습니다.
   *    ```js
   *    [ { id, distance, character: char, }, ]
   *    ```
   */
  static getSimilarCharsOf({ id, top = 0, bottom = 0 }) {
    const whole = Csm.getSimilarCharsOf({ id });
    let result = [];

    if (!top && !bottom) {
      result = whole;
    } else {
      if (top) {
        result.push(...whole.slice(0, top));
      }
      if (bottom) {
        result.push(...whole.slice(whole.length - bottom));
      }
    }

    // 현재로서는 컨트롤러에서 반환값을 수정할 일은 없습니다.
    // 수정할 가능성이 생기면 얕은 사본을 보내야 합니다.
    // result = result.map((v) => {
    //   return { ...v };
    // });
    return result;
  }

  /** 사용자 데이터에 기반해 가장 유사한 캐릭터를 찾아 반환합니다.
   *
   * @return {{
   *  id: string,
   *  distance: number,
   *  character: {
   *    id: string,
   *    name_ko: string,
   *    image_photo: string,
   *  }
   * }}
   *
   * - `birthday`는 `mm-dd` 형식이어야 합니다.
   */
  static csm({ birthday, hobby, personality, colors, styles }) {
    const pool = Character.getMany("ALL");
    const hat = new SortingHat(arguments[0]);
    return hat.automagic(pool);
  }

  static async getRank() {
    const rank = await Csm.getRank();
    return rank;
  }
}

export { CsmService };
