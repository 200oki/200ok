import { strict as assert } from "assert";

import { SortingHat } from "../utils/csmTools.js";

const refMock = {
  id: "admiral",
  name_ko: "일섭",
  image_photo: null,
  birthday: "01-27",
  birthday_yday: 27,
  hobby: "자연",
  personality: "무뚝뚝",
  colors: ["검정색", "파랑색"],
  styles: ["쿨"],
};

const poolMock = [
  {
    id: "boris",
    name_ko: "보리",
    image_photo: null,
    birthday: "11-06",
    birthday_yday: 311,
    hobby: "자연",
    personality: "무뚝뚝",
    colors: ["보라색", "검정색"],
    styles: ["고져스", "쿨"],
  },
  {
    id: "curt",
    name_ko: "뚝심",
    image_photo: null,
    birthday: "07-01",
    birthday_yday: 183,
    hobby: "자연",
    personality: "무뚝뚝",
    colors: ["하양색", "파랑색"],
    styles: ["쿨"],
  },
  {
    id: "gonzo",
    name_ko: "근성",
    image_photo: null,
    birthday: "10-13",
    birthday_yday: 287,
    hobby: "자연",
    personality: "무뚝뚝",
    colors: ["초록색", "검정색"],
    styles: ["심플", "쿨"],
  },
  {
    id: "ike",
    name_ko: "대공",
    image_photo: null,
    birthday: "05-16",
    birthday_yday: 137,
    hobby: "자연",
    personality: "무뚝뚝",
    colors: ["초록색", "파랑색"],
    styles: ["쿨"],
  },
];

const hat = new SortingHat(refMock);
assert.strictEqual(
  hat.automagic(poolMock).character.id,
  "ike",
  `"admiral"'s closest character is supposed to be "ike".`
);
