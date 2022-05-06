// import dotenv from "dotenv";
// dotenv.config();
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

/** 캐릭터 데이터 예시 (일반 주민)
 * {
 *   birthday: "01-27",
 *   birthday_day: 27,
 *   birthday_month: 1,
 *   birthday_yday: 27,
 *   catchphrase: "aye aye",
 *   colors: ["검정색", "파랑색"],
 *   favorite_saying: "Only quitters give up.",
 *   favorite_song: "Steep Hill",
 *   gender: "남",
 *   gender_asia: "남",
 *   hobby: "자연",
 *   id: "admiral",
 *   image_house:
 *     "https://acnhcdn.com/drivesync/render/houses/brd06_39_Admiral.png",
 *   image_icon: "https://acnhcdn.com/latest/NpcIcon/brd06.png",
 *   image_photo: "https://acnhcdn.com/latest/NpcBromide/NpcNmlBrd06.png",
 *   name_en: "Admiral",
 *   name_ko: "일섭",
 *   personality: "무뚝뚝",
 *   personality_subtype: "A",
 *   rank: 89.0,
 *   special: False,
 *   species: "새",
 *   styles: ["쿨"],
 *   tier: 6.0,
 * }
 */
/** 캐릭터 데이터 예시 (특수 주민)
 * {
 *   birthday: "01-26",
 *   birthday_day: 26,
 *   birthday_month: 1,
 *   birthday_yday: 26,
 *   gender: "남",
 *   gender_asia: "남",
 *   id: "cyrus",
 *   image_icon: "https://acnhcdn.com/latest/NpcIcon/alp.png",
 *   image_photo: "https://acnhcdn.com/latest/NpcPoster/NpcSpAlp.png",
 *   name_en: "Cyrus",
 *   name_ko: "리포",
 *   special: True,
 * }
 */
/** `id`별 캐릭터 데이터를 담고 있습니다. */
const _chars = JSON.parse(raw);
// 미리 한국어 이름으로 정렬해서 이후에 정렬을 할 필요가 없게 합니다.
// 물론 검색 시에 커스텀 정렬 쿼리를 받는 기능이 생기면 다 쓸데없는 짓입니다.
const _sorted = _(_chars).chain().values().sortBy("name_ko").value();

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

// 검색용 상수들입니다.
/** 값이 일치하면 매치합니다. */
const MATCH_EXACT = 1;
/** 문자열 키워드가 포함되어 있으면 매치합니다. */
const MATCH_SUBSTRING = 2;
/** 리스트 안에 일치하는 값이 있으면 매치합니다. */
const MATCH_INCLUDEEXACT = 3;
/** 리스트 안에 키워드를 포함하는 문자열이 있으면 매치합니다. */
const MATCH_INCLUDESUBSTRING = 4;
/** 검색 시 매치를 판단하는 스킴입니다. */
const MATCH_SCHEMES = {
  id: MATCH_EXACT,
  name_ko: MATCH_SUBSTRING,
  birthday: MATCH_EXACT,
  birthday_month: MATCH_EXACT,
  tier: MATCH_EXACT,
  hobby: MATCH_SUBSTRING,
  personality: MATCH_SUBSTRING,
  species: MATCH_SUBSTRING,
  colors: MATCH_INCLUDESUBSTRING,
  styles: MATCH_INCLUDESUBSTRING,
  "*": MATCH_EXACT,
};
/** 다중 검색시 먼저 필터링할 우선도입니다. (높을수록 먼저) */
const SEARCH_PRIORITIES = {
  id: 90,
  birthday: 80,
  species: 75,
  birthday_month: 70,
  tier: 60,
  personality: 50,
  hobby: 40,
  name_ko: 30,
  styles: 20,
  colors: 10,
};

// TIL `Array.fill`은 복사를 안한다.
const emptyArrays = (len) => Array.from(Array(len), () => []);

/** 캐릭터의 데이터를 담는 맵입니다. 동일한 데이터에 여러가지 키로 접근 가능합니다.
 *
 * ## 구조 예시
 * ```js
 * {
 *    "ALL": [ char ],
 *    "id": { [id]: char },
 *    "name_ko": { [name_ko]: char },
 *    "birthday": { [birthday]: [ char ] },
 *    "birthday_month": { [birthday_month]: [ char ] },
 *    "tier": { [tier]: [ char ] },
 *    "hobby": { [hobby]: [ char ] },
 *    "personality": { [personality]: [ char ] },
 *    "species": { [species]: [ char ] },
 *    "colors": { [color]: [ char ] },
 *    "styles": { [style]: [ char ] },
 * }
 * ```
 *
 * @todo `tier` 값이 없는 녀석들은 어떻게 해야 할까요... 현재 그런 녀석들은 티어가
 *  정해진 게임에는 절대로 못 나옵니다.
 */
const characters = {
  ALL: _sorted,
  id: _chars,
  name_ko: {},
  birthday: {},
  birthday_month: _.object(_.range(1, 13), emptyArrays(12)),
  tier: _.object(_.range(1, 7), emptyArrays(6)),
  hobby: _.object(ALL_HOBBIES, emptyArrays(ALL_HOBBIES.length)),
  personality: _.object(
    ALL_PERSONALITIES,
    emptyArrays(ALL_PERSONALITIES.length)
  ),
  species: {},
  colors: _.object(ALL_COLORS, emptyArrays(ALL_COLORS.length)),
  styles: _.object(ALL_STYLES, emptyArrays(ALL_STYLES.length)),
};

// characters.id 이외의 다른 프로퍼티를 채워 넣습니다.
/** 한국어 이름으로 정렬된 모든 캐릭터입니다. */
for (const char of characters.ALL) {
  // const [id, char] = entry;
  // const char = entry[1];
  let {
    name_ko,
    birthday,
    birthday_month,
    tier,
    hobby,
    personality,
    species,
    colors,
    styles,
  } = char;
  let birthday_month_str = birthday_month.toString();
  // String(undefined)는 'undefined'이고 undefined?.toString은 undefined입니다.
  let tier_str = tier?.toString();

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

  characters.personality[personality].push(char);
  characters.hobby[hobby].push(char);

  // species는 너무 많아서 엔트리를 미리 안만들었습니다.
  if (!(species in characters.species)) {
    characters.species[species] = [];
  }
  characters.species[species].push(char);

  // color, style은 원래 배열이기 때문에 까먹지 말고 한바퀴 더 돌립니다.
  for (const k of colors) {
    characters.colors[k].push(char);
  }

  for (const k of styles) {
    characters.styles[k].push(char);
  }
  charactersByBirthday[birthday][id] = char;
}

/** 캐릭터 별 `id`와 한국어 이름만을 빠르게 보내주기 위한 작은 컨테이너입니다. */
const characterNames = Object.fromEntries(
  Object.entries(characters).map(([k, v]) => [k, v.name_ko])
);

export { characters, charactersByBirthday, characterNames };
