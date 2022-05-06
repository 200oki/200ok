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
 * 메모리 상에서는 `character` 필드에 ~~`characters` 데이터 항목을 가리키는
 * 포인터를 저장하게 됩니다.~~
 * `id`, `name_ko`, `image_photo`, `image_icon` 정보를 복사해서 저장합니다.
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
    // 포인터로 하면 서버 메모리는 아낄 수 있지만 응답을 보낼 때
    // 캐릭터 데이터를 필터하기가 까다롭습니다.
    // 따라서 메모리를 더 쓰더라도 복사해서 저장하는 방법을 시도해 보겠습니다.
    // char.character = characters.id[char.id];
    const charData = characters.id[char.id];
    char.character = {
      id: char.id,
      name_ko: charData.name_ko,
      image_photo: charData.image_photo,
      image_icon: charData.image_icon,
    };
  }
}

export { csmdata, CsmModel };
