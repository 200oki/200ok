/** 대상 캐릭터를 Categorical Similarity Measure로 비교하는 툴킷입니다. */
class CharacterCategoricalComparison {
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
   * }} kwargs - 사용자 정보 5가지를 입력받습니다.
   */
  constructor({ birthday, hobby, personality, colors, styles }) {
    // Object.assign(this, arguments[0]);
    this.birthday = this.toYday(birthday);
    this.hobby = hobby;
    this.personality = personality;
    this.colors = new Set(colors);
    this.styles = new Set(styles);
  }

  /** 레퍼런스와 `pool` 안의 모든 캐릭터와의 거리를 반환합니다.
   *
   * @arg {any[]} pool - 캐릭터들의 데이터입니다.
   * @arg {{top: number?, bottom: number?}} options -
   *    포맷 옵션. `top`은 가장 유사한 n명,
   *    `bottom`은 가장 덜 유사한 n명을 배열로 합쳐 반환합니다.
   *    순서는 더 유사한 캐릭터가 항상 앞에 오게 됩니다.
   *    옵션이 전부 nullish이면 전체 배열이 반환됩니다.
   * @return {any[]} result - 거리 순으로 오름차순 정렬된 캐릭터들의
   *    배열을 반환합니다. 배열의 길이는 `option` 값에 따라 달라질 수 있습니다.
   *
   * ## 노트
   * node 엔진인 V8은 [`timsort`를 사용하며](https://github.com/v8/v8/blob/78f2610345fdd14ca401d920c140f8f461b631d1/third_party/v8/builtins/array-sort.tq#L5)
   * `timsort`의 best case는 배열이 이미 정렬되어 있는 경우(O(n))입니다.
   *
   * 따라서 힙으로 적당히 정렬해놓은 결과를 배열로 바꾸는 건 좋은 방법일 것이라고
   * 생각됩니다.
   */
  automagic(pool, { top = null, bottom = null }) {}

  /** 현재 레퍼런스와 다른 캐릭터 한 명을 비교한 거리를 반환합니다.
   *
   * @arg {{
   *  birthday_yday: number,
   *  hobby: string,
   *  personality: string,
   *  colors: string[],
   *  styles: string[],
   * }} otherCharData - 캐릭터 데이터에 있는 포맷 그대로 주면 됩니다.
   * @return {number} distance - 레퍼런스(사용자)와 비교 캐릭터와의
   *  5차원 공간상의 거리로, 최소 0, 최대 `sqrt(5)`입니다.
   */
  oneBatch({ birthday_yday, hobby, personality, colors, styles }) {
    return this.vecMag([
      this.compareBirthday(birthday_yday),
      this.compareHobby(hobby),
      this.comparePersonality(personality),
      this.compareColors(colors),
      this.compareStyles(styles),
    ]);
  }

  /** 생일 차이는 (차이 일 수 / 183) 입니다. (최소 0, 최대 1)
   * @arg {number} other - `yday` 포맷으로서 1월 1일 0시부터 지난 날 수입니다.
   * @return {number} distanceOnDimension
   */
  compareBirthday(other) {
    const delta = Math.abs(this.birthday - other);
    let result;
    if (delta < this.dayMod) {
      result = delta;
    } else {
      result = this.dayMod * 2 - delta;
    }
    return result / this.dayMod;
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
    return 1 - intersect / Math.max(this.colors, others);
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
    return 1 - intersect / Math.max(this.styles, others);
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
      (Date.UTC(this.refYear, m, d) - Date.UTC(this.refYear, 0, 0)) /
      this.oneDay
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
