import _ from "underscore";

import * as characterSchema from "../schemas/character.js";
const { characters, characterNames, ...constants } = characterSchema;

/** 캐릭터 데이터의 모델 인터페이스입니다.
 *
 * 캐릭터 데이터는 실제로는 db에 없고, 읽기 전용입니다.
 *
 * ## Methods
 *
 * - `static async get({ id })` - 캐릭터 한명을 골라 반환합니다.
 * - ~~`static async getByBirthday({ id })` -
 *  생일이 일치하는 캐릭터의 배열을 반환합니다.~~
 * - `static async list()` - 전체 캐릭터를 `{ id: name_ko }` 형식으로 반환합니다.
 * - `static async sample({ n })`- 캐릭터 `n`명을 무작위로 골라 배열로 반환합니다.
 *
 */
class Character {
  /** 캐릭터(들)이 있는지 살펴봅니다.
   *
   * @arg {string} key - 찾으려는 필드입니다. (`name_ko`, `id`, ...)
   * @arg {string} value - 찾아볼 값입니다. (`일섭`, `admiral`, ...)
   *  - **주의**: 값이 원래 숫자라도 룩업 목적으로는 문자열입니다.
   *    (예시: `birthday_month`)
   * @return {boolean} exists
   *
   * 필드는 아래에 언급된 값 중 하나입니다.
   *  - `id`
   *  - `name_ko`
   *  - `birthday`
   *  - `birthday_month`
   *  - `tier`
   *  - `hobby`
   *  - `colors`
   *
   * 이 안에 없는 필드를 쿼리하는 것은 에러입니다.
   */
  static async exists(key, value) {
    if (!(key in characters)) {
      throw new Error(
        `Field name "${key}" either doesn't exist or not peekable`
      );
    }
    if (!(value in characters[key])) {
      return false;
    } else {
      return (
        // id와 name_ko는 1:1 대응인 객체의 객체 형식이고 나머지는 배열인데,
        // characters 맵을 빌드하기 전에 키를 미리 만들어 놓기 때문에 빈 배열이 있습니다.
        value === "name_ko" || value === "id" || characters[key].length > 0
      );
    }
  }

  /** 캐릭터 한명을 골라 반환합니다. 찾는 `id`가 없으면 `null`을 돌려줍니다.
   *
   * @arg {{string}} id - 캐릭터 `id`는 영문 이름의 소문자/공백제거/아스키 버전입니다.
   * @return {{any}?} character
   */
  static async get({ id }) {
    if (id in characters.id) {
      return characters.id[id];
    } else {
      return null;
    }
  }

  /** **DEPRECATED** 생일이 일치하는 캐릭터들의 객체를 반환합니다.
   *
   * @arg {{string}} birthday - `MM-DD` 포맷 날짜입니다.
   * @return {{any}} characters - 캐릭터가 여러 명 포함된 객체입니다.
   * - 생일이 같은 캐릭터가 여러 명일 수도 있고, 없을 수도 있습니다.
   */
  static async getByBirthday({ birthday }) {
    // const found = _(characters).pick((v, k) => v.birthday === birthday);
    // return found;
    if (birthday in characters.birthday) {
      // 호환성을 위해 남겨둔 객체 형식 반환 코드입니다.
      return _(characters.birthday[birthday])
        .chain()
        .map((v) => [v.id, v])
        .object()
        .value();
    } else {
      return {};
    }
  }

  /** 전체 캐릭터를 `{ id: name_ko }` 형식으로 반환합니다.
   *
   * @return {{any}} characterNames
   */
  static async list() {
    return characterNames;
  }

  /** 캐릭터 `n`명을 무작위로 골라 배열로 반환합니다.
   *
   * @arg {number} n - 골라낼 샘플의 크기입니다.
   * @arg {string[]} [tiers] - 걸러낼 티어 값들입니다.
   *  - 티어는 원래 숫자이지만 해시테이블 키이기 때문에, 그리고 쿼리에서 받아오는 값이기
   *    때문에 여기서는 문자열입니다.
   * @return {any[]} randomCharacters - 반환값의 순서 역시 무작위입니다.
   */
  static async sample(n, tiers = []) {
    // const found = _(characters).chain().pairs().sample(n).object().value();
    // return found;
    let pool;
    if (tiers.length === 0) {
      pool = _(characters.id).values();
    } else {
      pool = _(characters.tier).chain().pick(tiers).values().flatten().value();
    }
    return _(pool).sample(n);
  }

  // static async search({ keywords = [] }) {}

  // static async searchBirthdayRange({})
}

export { Character };
