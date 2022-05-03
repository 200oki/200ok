/** 레퍼런스와 다른 캐릭터들을 비교해 가장 어울리는 캐릭터를 찾아주는 툴킷입니다.
 *
 * Categorical Similarity Measure로 레퍼런스와 다른 캐릭터를 비교하여 점수를
 * 매깁니다. 최종적으로 5차원 벡터 사이의 거리를 구해 가장 가까운 캐릭터가
 * 레퍼런스와 가장 가깝다고 판단합니다.
 *
 * ## Methods
 * - `automagic(pool)` - `pool` 안에서 레퍼런스와 가장 가까운 캐릭터를 찾아 반환합니다.
 * - `oneBatch({ birthday_yday, hobby, personality, colors, styles })` -
 *    현재 레퍼런스와 다른 캐릭터 한 명을 비교한 벡터를 반환합니다.
 * - `static toYday(birthday)` -
 *    `mm-dd` 문자열을 2020년(윤년) 기준 `yday` 포맷으로 바꿉니다.
 * - `static vecMag(vector)` - n차원 벡터의 크기를 구합니다.
 */
class SortingHat {
  static refYear = 2020;
  /* 밀리초 단위 하루입니다. */
  static oneDay = 1000 * 60 * 60 * 24;
  static dayMod = 183;

  /**
   * @arg {{
   *  birthday: string,
   *  hobby: string,
   *  personality: string,
   *  colors: string[],
   *  styles: string[],
   * }} reference - 사용자 정보 5가지를 입력받습니다.
   */
  constructor({ birthday, hobby, personality, colors, styles }) {
    // Object.assign(this, arguments[0]);
    this.birthday = SortingHat.toYday(birthday);
    this.hobby = hobby;
    this.personality = personality;
    this.colors = new Set(colors);
    this.styles = new Set(styles);
  }

  /** `pool` 안에서 레퍼런스와 가장 가까운 캐릭터를 찾아 반환합니다.
   *
   * @arg {any[]} pool - 캐릭터들의 데이터입니다.
   * @return {any} character -
   *    `pool` 안에서 레퍼런스와 가장 가까운 캐릭터를 찾아 반환합니다.
   */
  automagic(pool) {
    // (수정) 가장 가까운 캐릭터 한 명만 찾으면 되므로 정렬이나 힙은 필요 없습니다.
    // 거리의 최대값은 sqrt(5)입니다.
    let smallestSoFar = { distance: 5 };

    for (const char of pool) {
      if (char.special) {
        continue;
      }
      const distance = SortingHat.vecMag(this.oneBatch(char));
      if (distance < smallestSoFar.distance) {
        smallestSoFar = {
          id: char.id,
          character: {
            id: char.id,
            name_ko: char.name_ko,
            image_photo: char.image_photo,
          },
          distance,
        };
      }
    }

    // Just a sanity check;
    if ("character" in smallestSoFar) {
      return smallestSoFar;
    } else {
      throw new Error(`Character matching gone south`);
    }
  }

  /** 현재 레퍼런스와 다른 캐릭터 한 명을 비교한 벡터를 반환합니다.
   *
   * @arg {{
   *  birthday_yday: number,
   *  hobby: string,
   *  personality: string,
   *  colors: string[],
   *  styles: string[],
   * }} otherCharData - 캐릭터 데이터에 있는 포맷 그대로 주면 됩니다.
   * @return {number[]} vector - 레퍼런스(사용자)와 비교 캐릭터와의
   *  차이를 나타내는 5차원 벡터입니다.
   */
  oneBatch({ birthday_yday, hobby, personality, colors, styles }) {
    return [
      this.compareBirthday(birthday_yday),
      this.compareHobby(hobby),
      this.comparePersonality(personality),
      this.compareColors(colors),
      this.compareStyles(styles),
    ];
  }

  /** 생일 차이는 (차이 일 수 / 183) 입니다. (최소 0, 최대 1)
   * @arg {number} other - `yday` 포맷으로서 1월 1일 0시부터 지난 날 수입니다.
   * @return {number} distanceOnDimension
   */
  compareBirthday(other) {
    const delta = Math.abs(this.birthday - other);
    let result;
    if (delta < SortingHat.dayMod) {
      result = delta;
    } else {
      result = SortingHat.dayMod * 2 - delta;
    }
    return result / SortingHat.dayMod;
  }

  /** 단순 비교로 같으면 0, 다르면 1입니다. */
  compareHobby(other) {
    return this.hobby === other ? 0 : 1;
  }

  /** 단순 비교로 같으면 0, 다르면 1입니다. */
  comparePersonality(other) {
    return this.personality === other ? 0 : 1;
  }

  /** 중복값이 없으면 1, 전부 중복이면 0, 일부 중복이면 0.5입니다. */
  compareColors(others) {
    let intersect = 0;
    others = new Set(others);
    for (const item of this.colors) {
      if (others.has(item)) {
        intersect++;
      }
    }
    return 1 - intersect / Math.max(this.colors.size, others.size);
  }

  /** 중복값이 없으면 1, 전부 중복이면 0, 일부 중복이면 0.5입니다. */
  compareStyles(others) {
    let intersect = 0;
    others = new Set(others);
    for (const item of this.styles) {
      if (others.has(item)) {
        intersect++;
      }
    }
    return 1 - intersect / Math.max(this.styles.size, others.size);
  }

  /** `mm-dd` 문자열을 2020년(윤년) 기준 `yday` 포맷으로 바꿉니다.
   *
   * @arg {string} birthday - `mm-dd` 형식이어야 합니다.
   * @return {number} yday - day of year ex: `"02-29"` -> `60`
   *
   * 2020년으로 바꾸는 이유는 윤년이기 때문입니다.
   * 사용자 중에 생일이 윤년인 사람이 2월 29일을 입력했는데 윤년이 아닌 해를
   * 기준으로 하다 보면 계산이 꼬입니다.
   */
  static toYday(birthday) {
    let [m, d] = birthday.split("-");
    m--;
    return (
      (Date.UTC(SortingHat.refYear, m, d) -
        Date.UTC(SortingHat.refYear, 0, 0)) /
      SortingHat.oneDay
    );
  }

  /** n차원 벡터의 크기를 구합니다.
   *
   * @arg {number[]} vector
   * @return {number}
   */
  static vecMag(vector) {
    return Math.sqrt(vector.reduce((p, c) => p + c ** 2));
  }
}

export { SortingHat };
