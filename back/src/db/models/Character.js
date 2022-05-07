import _ from "underscore";

import {
  characters,
  charactersByBirthday,
  characterNames,
} from "../schemas/character.js";

/** 캐릭터 데이터의 모델 인터페이스입니다.
 *
 * 캐릭터 데이터는 실제로는 db에 없고, 읽기 전용입니다.
 *
 * ## Methods
 *
 * - `static exists(field, value)` - 캐릭터(들)이 있는지 살펴봅니다.
 * - `static get(id)` - 캐릭터 한명을 골라 반환합니다.
 * - `static getMany(field, value)` -
 *  `[field]: value` 필터 한 가지를 정확히 만족하는 캐릭터들을 반환합니다.
 * - ~~`static getByBirthday({ id })` -
 *  생일이 일치하는 캐릭터의 배열을 반환합니다.~~
 * - `static list()` - 전체 캐릭터를 `{ id: name_ko }` 형식으로 반환합니다.
 * - `static sample({ n })`- 캐릭터 `n`명을 무작위로 골라 배열로 반환합니다.
 * - `static filter(keyword, pool)` - 캐릭터 데이터를 필터해서 반환합니다.
 * - `static compareBySearchPriority(a, b)` -
 *  검색 키워드를 효율적으로 정렬하기 위한 비교 함수입니다.
 */
class Character {
  /** 캐릭터(들)이 있는지 살펴봅니다.
   *
   * @arg {string} field - 찾으려는 필드입니다. (`name_ko`, `id`, ...)
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
   *  - `personality`
   *  - `species`
   *  - `colors`
   *  - `styles`
   *
   * 이 안에 없는 필드를 쿼리하는 것은 에러입니다.
   */
  static exists(field, value) {
    if (!(field in characters) || field === "ALL") {
      throw new Error(
        `Field name "${field}" either doesn't exist or not peekable`
      );
    }
    if (!(value in characters[field])) {
      return false;
    } else {
      return (
        // id와 name_ko는 1:1 대응인 객체의 객체 형식이고 나머지는 배열인데,
        // characters 맵을 빌드하기 전에 키를 미리 만들어 놓기 때문에 빈 배열이 있습니다.
        value === "name_ko" || value === "id" || characters[field].length > 0
      );
    }
  }

  /** 캐릭터 한명을 골라 반환합니다. 찾는 `id`가 없으면 `null`을 돌려줍니다.
   *
   * @arg {string} id - 캐릭터 `id`는 영문 이름의 소문자/공백제거/아스키 버전입니다.
   * @return {{any}?} character
   */
  static get(id) {
    if (id in characters.id) {
      return characters.id[id];
    } else {
      return null;
    }
  }

  /** `[field]: value` 필터 한 가지를 정확히 만족하는 캐릭터들을 반환합니다.
   *
   * @arg {string} field - 찾으려는 필드입니다. (`name_ko`, `id`, ...)
   * @arg {string} value - 찾아볼 값입니다. (`일섭`, `admiral`, ...)
   *  - **주의**: 값이 원래 숫자라도 룩업 목적으로는 문자열입니다.
   *    (예시: `birthday_month`)
   * @return {any[]} found - 캐릭터들의 배열을 반환합니다.
   *    캐릭터가 한 명이라도 배열입니다.
   *
   * 필드는 아래에 언급된 값 중 하나입니다.
   *  - `ALL`: 전체 캐릭터의 리스트입니다. `value` 인자는 무시됩니다.
   *  - `id`
   *  - `name_ko`
   *  - `birthday`
   *  - `birthday_month`
   *  - `tier`
   *  - `hobby`
   *  - `personality`
   *  - `species`
   *  - `colors`
   *  - `styles`
   *
   * 이 안에 없는 필드를 쿼리하는 것은 에러입니다.
   */
  static getMany(field, value) {
    if (field === "ALL") {
      return characters.ALL;
    }
    if (!(field in characters)) {
      throw new RequestError(
        { status: status.STATUS_405_METHODNOTALLOWED },
        `Field name "${field}" either doesn't exist or not searchable`
      );
    }
    if (!(value in characters[field])) {
      // 부분 문자열 검색이 가능하게 하기 위해 여기서도 필요하면 필터를 합니다.
      // 필터가 하나밖에 없고 문자열 검색이면 characters에 키가 없기 때문입니다.
      return this.filter([field, value], characters.ALL);
    } else {
      const found = characters[field][value];
      return Array.isArray(found) ? found : [found];
    }
  }

  /** **DEPRECATED** 생일이 일치하는 캐릭터들의 객체를 반환합니다.
   *
   * @arg {{string}} birthday - `MM-DD` 포맷 날짜입니다.
   * @return {{any}} characters - 캐릭터가 여러 명 포함된 객체입니다.
   * - 생일이 같은 캐릭터가 여러 명일 수도 있고, 없을 수도 있습니다.
   */
  static getByBirthday({ birthday }) {
    // const found = _(characters).pick((v, k) => v.birthday === birthday);
    // return found;
    if (birthday in charactersByBirthday) {
      return charactersByBirthday[birthday];
    } else {
      return {};
    }
  }

  /** 전체 캐릭터를 `{ id: name_ko }` 형식으로 반환합니다.
   *
   * @return {{any}} characterNames
   */
  static list() {
    return characterNames;
  }

  /** 캐릭터 `n`명을 무작위로 골라 객체로 반환합니다.
   *
   * @arg {{number}} n - 골라낼 샘플의 크기입니다.
   * @return {{any}} characters
   */
  static sample(n, tiers = []) {
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

  /** 캐릭터 데이터를 필터해서 반환합니다.
   *
   * @arg {[field: string, value: string]} keyword - 검색 키워드 필드/값 쌍입니다.
   *  - 예시: `[ field, value ]`
   * @arg {any[]} pool - 필터를 적용할 대상입니다.
   * @return {any[]} result - 필터된 데이터를 반환합니다.
   */
  static filter(keyword, pool) {
    const field = keyword[0];
    const value = keyword[1].toLowerCase();
    if (!(field in characters) || field === "ALL") {
      throw new RequestError(
        { status: status.STATUS_405_METHODNOTALLOWED },
        `Field name "${field}" either doesn't exist or not searchable`
      );
    }
    const scheme = constants.MATCH_SCHEMES[field];
    // is ${v} superstring of keyword?
    const superstringOfKeyword = (v) => v.toLowerCase().includes(value);

  // static async searchBirthdayRange({})
}

export { Character };
