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
 * ```js
 * {
 *    id: { id: char },
 *    name_ko: { name_ko: char },
 *
 *    birthday: [ char ],
 *    birthday_month: [ char ],
 *    color: [ char ],
 *    hobby: [ char ],
 *    style: [ char ],
 * }
 * ```
 */
const characters = {
  // id, name_ko는 매핑 타입입니다.
  id: _chars,
  name_ko: {},

  // 여기부터는 1:1 매칭이 되지 않을 수 있으므로 매핑이 아닌 컨테이너입니다.
  birthday: [],
  birthday_month: [],
  color: [],
  hobby: [],
  style: [],
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
  const [id, char] = entry;
  let { name_ko, birthday, birthday_month, color, hobby, style } = char;

  // 엔트리가 없으면 지금 새로 만듭니다.
}

/** `characters`의 다른 얼굴로 빠른 생일 검색을 위해 생일별로 구분된 버전입니다. */
const charactersByBirthday = {};
for (const entry of Object.entries(characters)) {
  const [id, char] = entry;
  const birthday = char.birthday;
  if (!(birthday in charactersByBirthday)) {
    charactersByBirthday[birthday] = {};
  }
  charactersByBirthday[birthday][id] = char;
}

/** 캐릭터 별 `id`와 한국어 이름만을 빠르게 보내주기 위한 작은 컨테이너입니다. */
const characterNames = Object.fromEntries(
  Object.entries(characters).map(([k, v]) => [k, v.name_ko])
);
// const characterNamesMock = {
//   admiral: "일섭",
//   cyrus: "리포",
// };

export { characters, charactersByBirthday, characterNames };
