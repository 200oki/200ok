import _ from "underscore";

import { Character } from "../db/index.js";
import * as status from "../utils/status.js";

/**
 * @typedef {{
 *  errorMessage: string,
 *  statusCode: number
 * }} errorinfo
 */

/** 캐릭터 서비스 클래스입니다.
 *
 * 캐릭터 데이터는 읽기 전용입니다.
 * 찾는 `id`가 없으면 `errorinfo`를 반환합니다.
 */
class CharacterService {
  /** 캐릭터 한명을 골라 반환합니다. 찾는 `id`가 없으면 404 에러입니다.
   *
   * @arg {{id: string, fields: string[]}} payload -
   * ```js
   * { id: string, fields: string[] = []}
   * ```
   * - `id`는 영문 이름의 소문자/공백제거/아스키 버전입니다.
   * - `fields`는 포함하고 싶은 필드 목록입니다.
   * - 빈 배열이면 모든 필드를 포함합니다.
   * @return {{any}|errorinfo} character
   */
  static async get({ id, fields = [] }) {
    const character = await Character.get({ id });
    if (character) {
      if (fields.length) {
        return _(character).pick(fields);
      } else {
        return character;
      }
    } else {
      return {
        errorMessage: `character record {${id}} not found`,
        statusCode: status.STATUS_404_NOTFOUND,
      };
    }
  }

  /** 생일이 일치하는 캐릭터들의 객체를 반환합니다.
   *
   * @arg {{birthday: string, fields: string[]}} payload -
   * ```js
   * { birthday: string, fields: string[] = []}
   * ```
   * - `birthday`는 `MM-DD` 포맷 날짜입니다.
   * - `fields`는 포함하고 싶은 필드 목록입니다. 빈 배열이면 모든 필드를 포함합니다.
   * @return {{any}} characters - 캐릭터들의 객체입니다.
   * - 생일이 같은 캐릭터가 여러 명일 수도 있고, 없을 수도 있습니다.
   */
  static async getByBirthday({ birthday, fields = [] }) {
    const found = await Character.getByBirthday({ birthday });
    if (fields.length) {
      return _(found)
        .chain()
        .pairs()
        .map(([k, v]) => [k, _(v).pick(fields)])
        .object()
        .value();
    } else {
      return found;
    }
  }

  /** 전체 캐릭터를 `{ id: name_ko }` 형식으로 반환합니다.
   *
   * @return {{any}} characterNames
   */
  static async list() {
    const characters = await Character.list();
    return characters;
  }

  /** 캐릭터 `n`명을 무작위로 골라 배열로 반환합니다.
   *
   * @arg {number} n - 골라낼 샘플의 크기입니다.
   * @arg {string[]} [tiers] - 걸러낼 티어 값들입니다.
   *  - 티어는 원래 숫자이지만 해시테이블 키이기 때문에, 그리고 쿼리에서 받아오는 값이기
   *    때문에 여기서는 문자열입니다.
   * @arg {string[]} [fields] - `fields`는 포함하고 싶은 필드 목록입니다. 빈 배열이면 모든 필드를 포함합니다.
   * @return {any[]} randomCharacters - 반환값의 순서 역시 무작위입니다.
   */
  static async sample(n, tiers = [], fields = []) {
    const result = await Character.sample(n, tiers);
    if (fields.length) {
      return _(result)
        .chain()
        .map((v) => _(v).pick(fields))
        .value();
    } else {
      return result;
    }
  }
}

export { CharacterService };
