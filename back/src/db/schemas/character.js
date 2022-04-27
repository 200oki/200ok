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
const characters = JSON.parse(raw);
// raw는 크기가 꽤 크므로 없애 버립니다.
raw = null;

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
