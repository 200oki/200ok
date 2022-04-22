import { characters, characterNames } from "../schemas/character";

/** 캐릭터 데이터의 최하단 인터페이스입니다.
 *
 * 캐릭터 데이터는 실제로는 db에 없고, 읽기 전용입니다.
 */
class Character {
  // static async create

  static async read({ id }) {}

  static async list() {}

  static async sample({ n }) {}

  static async search({ keywords = [] }) {}

  // static async searchBirthdayRange({})
}

export { Character };
