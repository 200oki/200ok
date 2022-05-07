import _ from "underscore";

import * as characterSchema from "../schemas/character.js";
const { characters, characterNames, ...constants } = characterSchema;
import { RequestError } from "../../utils/errors.js";
import * as status from "../../utils/status.js";
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
   *  - `special`
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
   *  - `special`
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
  static list() {
    return characterNames;
  }

  /** 지정된 캐릭터 데이터 필드에 어떤 값들이 있는지 반환합니다.
   *
   * @arg {string} field - 찾으려는 필드입니다. (`species`, `hobby`, ...)
   * @return {string[]} - 결과값은 문자열의 배열입니다.
   */
  static listCategories(field) {
    if (
      !["hobby", "personality", "styles", "colors", "species"].includes(field)
    ) {
      throw new RequestError(
        { status: status.STATUS_404_NOTFOUND },
        `Field name "${field}" either doesn't exist or not peekable`
      );
    }

    return Object.keys(characters[field]);
  }

  /** 캐릭터 `n`명을 무작위로 골라 배열로 반환합니다.
   *
   * @arg {number} n - 골라낼 샘플의 크기입니다.
   * @arg {string[]} [tiers] - 걸러낼 티어 값들입니다.
   *  - 티어는 원래 숫자이지만 해시테이블 키이기 때문에, 그리고 쿼리에서 받아오는 값이기
   *    때문에 여기서는 문자열입니다.
   * @return {any[]} randomCharacters - 반환값의 순서 역시 무작위입니다.
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

    return pool.filter((char) => {
      switch (scheme) {
        case constants.MATCH_SUBSTRING:
          return char[field]?.toLowerCase().includes(value);
        case constants.MATCH_INCLUDEEXACT:
          return char[field]?.includes(value);
        case constants.MATCH_INCLUDESUBSTRING:
          return char[field]?.some(superstringOfKeyword);
        default:
          // 기본적으로 정확히 일치해야 통과합니다.
          return String(char[field]) === value;
      }
    });
  }

  /** 검색 키워드를 효율적으로 정렬하기 위한 비교 함수입니다.
   *
   * @arg {[string, string]} a
   * @arg {[string, string]} b
   * - `a`, `b`는 `[ field, value ]` 쌍입니다.
   *    정렬할때 `zip`하면 됩니다.
   * @return number - 정렬 결과 *우선도가 높은 필드가 뒤로 갑니다.*
   */
  static compareBySearchPriority(a, b) {
    // 실험 결과 자바스크립트는 불리언에 비트시프트를 하면 알아서 숫자로 바꿉니다.
    const flag =
      ((b[0] in constants.SEARCH_PRIORITIES) << 1) |
      (a[0] in constants.SEARCH_PRIORITIES);
    switch (flag) {
      case 0b11:
        return (
          constants.SEARCH_PRIORITIES[a[0]] - constants.SEARCH_PRIORITIES[b[0]]
        );
      case 0b10:
        // b가 있고 a는 없으면 b가 뒤로 갑니다. 아래는 그 반대.
        return -1;
      case 0b01:
        return 1;
      default:
        return 0;
    }
  }
}

export { Character };
