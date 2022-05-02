/** 대상 캐릭터를 Categorical Similarity Measure로 비교하는 툴킷입니다. */
class CharacterCategoricalComparison {
  refYear = 2020;
  /* 밀리초 단위 하루입니다. */
  oneDay = 1000 * 60 * 60 * 24;
  dayMod = 183;

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

  /** `mm-dd` 문자열을 2020년(윤년) 기준 `yday` 포맷으로 바꿉니다.
   *
   * @arg {string} birthday - `mm-dd` 형식이어야 합니다.
   * @return {number} yday - day of year ex: `"02-29"` -> `60`
   *
   * 2020년으로 바꾸는 이유는 윤년이기 때문입니다.
   * 사용자 중에 생일이 윤년인 사람이 2월 29일을 입력했는데 윤년이 아닌 해를
   * 기준으로 하다 보면 계산이 꼬입니다.
   */
  toYday(birthday) {
    let [m, d] = birthday.split("-");
    m--;
    return (
      (Date.UTC(this.refYear, m, d) - Date.UTC(this.refYear, 0, 0)) /
      this.oneDay
    );
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

  /** n차원 벡터의 크기를 구합니다.
   *
   * @arg {number[]} vector
   * @return {number}
   */
  static vecMul(vector) {
    return Math.sqrt(vector.reduce((p, c) => p + c ** 2));
  }
}
