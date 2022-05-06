import fs from "fs";
import path from "path";

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

import { characters } from "./character.js";

const csmSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  name_ko: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  image_photo: {
    type: String,
    required: true,
  },
});

const CsmModel = model("csms", csmSchema);

const __dirname = path.resolve();
let raw = fs.readFileSync(
  path.resolve(__dirname, "./src/db/schemas/csmtable.json")
);

/** `csmdata`는 모든 캐릭터들 간의 유사성 평가 결과를 저장하고 있습니다.
 *
 * `csmtable.json`은 캐릭터의 `id`만을 포함하고 있지만
 * 메모리 상에서는 `character` 필드에 `characters` 데이터 항목을 가리키는
 * 포인터를 저장하게 됩니다.
 *
 * ## 구조 예시
 * ```js
 *  {
 *    [id]: [
 *      { [id]: char.id, distance: number, character: char }
 *    ]
 *  }
 * ```
 */
const csmdata = JSON.parse(raw);

for (const similarityRanks of Object.values(csmdata)) {
  for (const char of similarityRanks) {
    char.character = characters.id[char.id];
  }
}

export { csmdata, CsmModel };
