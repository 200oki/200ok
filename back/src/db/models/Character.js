import { characters, characterNames } from "../schemas/character";

/**
 * @typedef {{
 *  errorMessage: string,
 *  statusCode: number
 * }} errorinfo
 */

/** 캐릭터 데이터의 최하단 인터페이스입니다.
 *
 * 캐릭터 데이터는 실제로는 db에 없고, 읽기 전용입니다.
 */
class Character {
  /** 캐릭터 한명을 골라 반환합니다. 찾는 id가 없으면 404 에러입니다.
   *
   * @arg {{string}} id - 캐릭터 `id`는 영문 이름의 소문자/공백제거/아스키 버전입니다.
   * @return {{any}|errorinfo} character
   */
  static async get({ id }) {}

  /** 생일이 일치하는 캐릭터의 배열을 반환합니다.
   *
   * @arg {{string}} birthday - `MM-DD` 포맷 날짜입니다.
   * @return {{any}[]} characters - 캐릭터의 배열입니다.
   * - 생일이 같은 캐릭터가 여러 명일 수도 있고, 없을 수도 있습니다.
   */
  static async getByBirthday({ id }) {}

  /** 전체 캐릭터를 `{ id: name_ko }` 형식으로 반환합니다.
   *
   * @return {{any}} characterNames
   */
  static async list() {}

  /** 캐릭터 `n`명을 무작위로 골라 반환합니다.
   *
   * @arg {{number}} n - 골라낼 샘플의 크기입니다.
   * @return {{any}[]} characters
   */
  static async sample({ n }) {}

  // static async search({ keywords = [] }) {}

  // static async searchBirthdayRange({})
}

export { Character };
