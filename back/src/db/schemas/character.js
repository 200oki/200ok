import fs from "fs";
import path from "path";
// json 임포트 불가: 아마 babel을 사용하지 않아서 그런 것 같습니다.
// 어쨌든 fs로 읽어도 되니까 가만히 둡시다.
// 고장 안났으면 고칠 필요 없습니다.
// import * as characters from "./src/db/schemas/characters.json";

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
 *    "colors": { color: [ char ] },
 *    "styles": { style: [ char ] },
 * }
 * ```
 */
const characters = {
  id: _chars,
  name_ko: {},
  birthday: {},
  birthday_month: {},
  tier: {},
  hobby: {},
  colors: {},
  styles: {},
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

// characters.id 이외의 다른 프로퍼티를 채워 넣습니다.
for (const entry of Object.entries(characters.id)) {
  // const [id, char] = entry;
  const char = entry[1];
  let { name_ko, birthday, birthday_month, colors, hobby, styles } = char;
  let birthday_month_str = birthday_month.toString();

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
  if (!(birthday_month_str in characters.birthday_month)) {
    characters.birthday_month[birthday_month_str] = [];
  }
  characters.birthday_month[birthday_month_str].push(char);

  // special npc는 아래 항목들이 없습니다.
  if (char.special) {
    continue;
  }

  if (!(hobby in characters.hobby)) {
    characters.hobby[hobby] = [];
  }
  characters.hobby[hobby].push(char);

  // color, style은 원래 배열이기 때문에 까먹지 말고 한바퀴 더 돌립니다.
  for (const k of colors) {
    if (!(k in characters.colors)) {
      characters.colors[k] = [];
    }
    characters.colors[k].push(char);
  }

  for (const k of styles) {
    if (!(k in characters.styles)) {
      characters.styles[k] = [];
    }
    characters.styles[k].push(char);
  }
}

/** 캐릭터 별 `id`와 한국어 이름만을 빠르게 보내주기 위한 작은 컨테이너입니다. */
const characterNames = Object.fromEntries(
  Object.entries(characters.id).map(([k, v]) => [k, v.name_ko])
);
// const characterNamesMock = {
//   admiral: "일섭",
//   cyrus: "리포",
// };

export { characters, characterNames };
