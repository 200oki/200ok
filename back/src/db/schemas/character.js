import fs from "fs";
import path from "path";
// json 임포트 불가: 아마 babel을 사용하지 않아서 그런 것 같습니다.
// 어쨌든 fs로 읽어도 되니까 가만히 둡시다.
// 고장 안났으면 고칠 필요 없습니다.
// import * as characters from "./src/db/schemas/characters.json";

import _ from "underscore";

const __dirname = path.resolve();
let raw = fs.readFileSync(
  path.resolve(__dirname, "./src/db/schemas/characters.json")
);

/*
const charactersMock = {
  admiral: {
    id: "admiral",
    special: false,
    name_en: "Admiral",
    name_ko: "일섭",
    image_icon: "https://acnhcdn.com/latest/NpcIcon/brd06.png",
    image_photo: "https://acnhcdn.com/latest/NpcBromide/NpcNmlBrd06.png",
    image_house:
      "https://acnhcdn.com/drivesync/render/houses/brd06_39_Admiral.png",
    species: "Bird",
    gender: "Male",
    gender_asia: "Male",
    personality: "Cranky",
    personality_subtype: "A",
    hobby: "Nature",
    birthday: "01-27",
    birthday_month: 1,
    birthday_day: 27,
    catchphrase: "aye aye",
    favorite_song: "Steep Hill",
    favorite_saying: "Only quitters give up.",
    styles: ["Cool"],
    colors: ["Black", "Blue"],
  },
  cyrus: {
    id: "cyrus",
    special: true,
    name_en: "Cyrus",
    name_ko: "리포",
    image_icon: "https://acnhcdn.com/latest/NpcIcon/alp.png",
    image_photo: "https://acnhcdn.com/latest/NpcPoster/NpcSpAlp.png",
    gender: "Male",
    gender_asia: "Male",
    birthday: "01-26",
    birthday_month: 1,
    birthday_day: 26,
  },
};
 */

/** `id`별 캐릭터 데이터를 담고 있습니다. */
// const characters = charactersMock;
const _chars = JSON.parse(raw);
// raw는 크기가 꽤 크므로 없애 버립니다. -> 없앨 필요 없습니다.
// raw = null;

// characters 맵 빌드를 위한 준비 작업이지만 상수로도 쓰려면 쓸 수 있을 것 같습니다.
const ALL_HOBBIES = ["자연", "운동", "놀이", "교육", "패션", "음악"];
const ALL_PERSONALITIES = [
  "무뚝뚝",
  "아이돌",
  "단순 활발",
  "먹보",
  "친절함",
  "성숙함",
  "운동광",
  "느끼함",
];
const ALL_STYLES = ["액티브", "쿨", "큐트", "엘레강스", "고져스", "심플"];
const ALL_COLORS = [
  "베이지색",
  "검정색",
  "파랑색",
  "갈색",
  "컬러풀색",
  "회색",
  "초록색",
  "연파랑색",
  "오렌지색",
  "핑크색",
  "보라색",
  "빨강색",
  "하양색",
  "노랑색",
];

/** 캐릭터의 데이터를 담는 맵입니다. 동일한 데이터에 여러가지 키로 접근 가능합니다.
 *
 * ## 구조 예시
 * ```js
 * {
 *    "id": { id: char },
 *    "name_ko": { name_ko: char },
 *    "birthday": { birthday: [ char ] },
 *    "birthday_month": { birthday_month: [ char ] },
 *    "tier": { tier: [ char ] },
 *    "hobby": { hobby: [ char ] },
 *    "personality": { personality: [ char ] },
 *    "colors": { color: [ char ] },
 *    "styles": { style: [ char ] },
 * }
 * ```
 *
 * @todo `tier` 값이 없는 녀석들은 어떻게 해야 할까요... 현재 그런 녀석들은 티어가
 *  정해진 게임에는 절대로 못 나옵니다.
 */
const characters = {
  id: _chars,
  name_ko: {},
  birthday: {},
  birthday_month: _.object(_.range(1, 13), Array(12).fill([])),
  tier: _.object(_.range(1, 7), Array(6).fill([])),
  hobby: _.object(ALL_HOBBIES, Array(ALL_HOBBIES.length).fill([])),
  personality: _.object(
    ALL_PERSONALITIES,
    Array(ALL_PERSONALITIES.length).fill([])
  ),
  colors: _.object(ALL_COLORS, Array(ALL_COLORS.length).fill([])),
  styles: _.object(ALL_STYLES, Array(ALL_STYLES.length).fill([])),
};

/** 모든 캐릭터의 한국어 이름을 담고 있습니다. 존재 여부 검사에 사용합니다.
 *
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * - https://leetcode.com/problems/contains-duplicate/discuss/515531/javascript-set-vs-object
 *
 * 언급된 두 아티클을 참고해 보면 자바스크립트 `Set`은 해시테이블 방식이 아닌 듯 합니다.
 * 그래서 이것도 `Set`이 아니고 값이 없는 객체입니다.
 */
// const ALLNAMES_KO = {};

console.log(characters.tier);

// characters.id 이외의 다른 프로퍼티를 채워 넣습니다.
for (const entry of Object.entries(characters.id)) {
  // const [id, char] = entry;
  const char = entry[1];
  let { name_ko, birthday, birthday_month, tier, colors, hobby, styles } = char;
  let birthday_month_str = birthday_month.toString();
  // String(undefined)는 'undefined'이고 undefined?.toString은 undefined입니다.
  let tier_str = tier?.toString();
  console.log(`${char.id}: ${tier} = ${tier_str}`);

  // name_ko는 검색 용도도 있지만 코멘트 쿼리에서 주민 존재 검사에도 쓸 수 있습니다.
  if (!(name_ko in characters.name_ko)) {
    characters.name_ko[name_ko] = char;
  }

  // birthday는 오늘의 생일 얻기에 사용됩니다.
  if (!(birthday in characters.birthday)) {
    characters.birthday[birthday] = [];
  }
  characters.birthday[birthday].push(char);

  // birthday_month는 이달의 생일 캐릭터 및 달력에 사용됩니다.
  characters.birthday_month[birthday_month_str].push(char);

  // tier는 게임에 사용됩니다.
  // 주의사항은, tier 값이 없는 녀석들도 있습니다.
  if (tier) {
    characters.tier[tier_str].push(char);
  }

  // special npc는 아래 항목들이 없습니다.
  if (char.special) {
    continue;
  }

  characters.hobby[hobby].push(char);

  // color, style은 원래 배열이기 때문에 까먹지 말고 한바퀴 더 돌립니다.
  for (const k of colors) {
    characters.colors[k].push(char);
  }

  for (const k of styles) {
    characters.styles[k].push(char);
  }
}

/** 캐릭터 별 `id`와 한국어 이름만을 빠르게 보내주기 위한 작은 맵입니다. */
const characterNames = Object.fromEntries(
  Object.entries(characters.id).map(([k, v]) => [k, v.name_ko])
);
// const characterNamesMock = {
//   admiral: "일섭",
//   cyrus: "리포",
// };

console.log(
  _(characters.tier).mapObject((v, k) => {
    return _(v).pluck("id");
  })
);

export {
  characters,
  characterNames,
  ALL_COLORS,
  ALL_HOBBIES,
  ALL_PERSONALITIES,
  ALL_STYLES,
};
