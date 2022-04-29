import { Router } from "express";

import { CharacterService } from "../services/characterService.js";
import * as status from "../utils/status.js";
import { RequestError } from "../utils/errors.js";

const router = Router();

/** ","로 구분된 쿼리 스트링을 처리해 배열로 바꿔줍니다.
 *
 * @arg {string?} queryStr - 생 쿼리 문자열입니다.
 * @return {string[]} values - 쿼리값의 배열입니다.
 */
const parseArrayQuery = (queryStr) => {
  if (!queryStr) {
    return [];
  } else {
    return queryStr.split(",");
  }
};

/**
 * @swagger
 * tags:
 *  name: Characters
 *  description: Characters API 문서입니다.
 */

/** query: [ size=n ] [ &tiers=1,3,... ] [ &fields=field1,field2,... ] */
router.get("/characters/random", async (req, res, next) => {
  try {
    let size = Number(req.query.size);
    if (isNaN(size)) {
      size = 1;
    }
    let tiers = parseArrayQuery(req.query.tiers);
    let fields = parseArrayQuery(req.query.fields);

    let result = await CharacterService.sample(size, tiers, fields);
    res.status(status.STATUS_200_OK).json({ success: true, payload: result });
  } catch (error) {
    next(error);
  }
});

/** queries: fields, [ props, ] [ values, ] [ page, size ]
 *  - fields=field1,field2,...
 *  - [ props=prop1,prop2,... ]
 *  - [ values=value1,value2,... ]
 *  - [ page=n ]
 *  - [ size=n ]
 */
router.get("/characters/search", async (req, res, next) => {
  try {
    if (!("fields" in req.query)) {
      throw new RequestError(
        { status: status.STATUS_400_BADREQUEST },
        `"fields" query is required`
      );
    }
    const fields = parseArrayQuery(req.query.fields);
    const props = parseArrayQuery(req.query.props);
    const values = parseArrayQuery(req.query.values);
    const page = Number(req.query.page);
    const size = Number(req.query.size);
    // page, size 쿼리는 없어도 되지만 있으려면 둘 다 있어야 합니다.
    if (isNaN(page) != isNaN(size)) {
      throw new RequestError(
        { status: status.STATUS_400_BADREQUEST },
        `"page" and "size" both need to be present if one is provided`
      );
    }

    let result = await CharacterService.search(props, values, fields);
    const total = result.length;
    if (!isNaN(page)) {
      result = CharacterService.page(result, size, page);
    }
    res
      .status(status.STATUS_200_OK)
      .json({ success: true, total, payload: result });
  } catch (error) {
    next(error);
  }
});

/** DEPRECATED query: birthday=mm-dd[&fields=field1,field2,...] */
/**
 * @swagger
 * /characters:
 *  get:
 *    summary: "전체 캐릭터를 반환합니다."
 *    description: |
 *      반환 형식은 다음과 같습니다.
 *      ```js
 *      { id: name_ko }
 *      ```
 *    tags: [Characters]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: 요청 성공 여부
 *                  example: true
 *                payload:
 *                  type: object
 *                  additionalProperties:
 *                    type: string
 *                    example: 일섭
 *                  description: |
 *                    키는 캐릭터의 id이고, 값은 한국어판 이름입니다.
 */
/**
 * @swagger
 * /characters?birthday=:
 *  get:
 *    summary: "(DEPRECATED) 생일인 캐릭터들을 반환합니다."
 *    description: |
 *      반환 형식은 다음과 같습니다.
 *      ```js
 *      { id: char }
 *      ```
 *    tags: [Characters]
 *    parameters:
 *      - in: query
 *        name: birthday
 *        schema:
 *          type: string
 *          format: mm-dd
 *          pattern: '^[01][0-9]-[0-3][0-9]$'
 *        required: true
 *        description: 생일이 `mm-dd`인 캐릭터들의 객체를 반환합니다.
 *        example: 01-26
 *      - in: query
 *        name: fields
 *        schema:
 *          type: string
 *          format: field[]
 *        required: false
 *        description: |
 *          데이터에 받고 싶은 필드를 쉼표로 구분해서 넣어줍니다.
 *          이 쿼리가 없으면 모든 필드가 반환됩니다.
 *          `birthday` 쿼리가 없으면 `fields` 쿼리는 무시됩니다.
 *        example: name_en,gender
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: 요청 성공 여부
 *                  example: true
 *                payload:
 *                  type: object
 *                  additionalProperties:
 *                    type: object
 *                    description: character 데이터입니다.
 */
router.get("/characters", async (req, res, next) => {
  try {
    let found;
    if (req.query.birthday) {
      // birthday 쿼리가 있을 때는 오늘의 생일 모드입니다.
      // 쿼리에 원하는 필드값을 넣을 수 있습니다.
      let fields = parseArrayQuery(req.query.fields);
      found = await CharacterService.getByBirthday({
        birthday: req.query.birthday,
        fields,
      });
    } else {
      // 쿼리가 없으면 전체 캐릭터 이름 사전을 보내줍니다.
      found = await CharacterService.list();
    }

    res.status(status.STATUS_200_OK).json({ success: true, payload: found });
  } catch (error) {
    next(error);
  }
});

/** query: fields=name_ko,name_en */
/**
 * @swagger
 * /characters/{id}:
 *  get:
 *    summary: id와 일치하는 캐릭터를 반환합니다.
 *    description: 한 캐릭터의 데이터를 전부 또는 일부 반환합니다.
 *    tags: [Characters]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: 캐릭터 id는 영문 이름 소문자에서 공백을 제거한 문자열입니다.
 *        example: admiral
 *      - in: query
 *        name: fields
 *        schema:
 *          type: string
 *          format: field[]
 *        required: false
 *        description: |
 *          데이터에 받고 싶은 필드를 쉼표로 구분해서 넣어줍니다.
 *          이 쿼리가 없으면 모든 필드가 반환됩니다.
 *        example: name_en,name_ko,birthday
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: 요청 성공
 *                  example: true
 *                payload:
 *                  type: object
 *                  additionalProperties:
 *                    type: object
 *                    description: character 데이터입니다.
 *      404:
 *        description: 찾는 id가 없으면 404입니다.
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: 요청 실패
 *                  example: false
 *                errorMessage:
 *                  type: string
 *                  example: character record {spam} not found
 */
router.get("/characters/:id", async (req, res, next) => {
  try {
    // 쿼리에 원하는 필드값을 넣을 수 있습니다.
    let fields = parseArrayQuery(req.query.fields);

    let found = await CharacterService.get({ id: req.params.id, fields });
    if (found.errorMessage) {
      throw new RequestError({ status: found.statusCode }, found.errorMessage);
    }
    res.status(status.STATUS_200_OK).json({ success: true, payload: found });
  } catch (error) {
    next(error);
  }
});

/** /characters/random swagger 문서
 * @swagger
 * /characters/random:
 *  get:
 *    summary: "무작위 캐릭터를 반환합니다."
 *    description: |
 *      size, tiers, fields 쿼리로 반환값을 세밀하게 조정할 수 있습니다.
 *      반환 형식은 다음과 같습니다. 순서 역시 무작위입니다.
 *      ```js
 *      [ char1, char2, char3, ... ]
 *      ```
 *    tags: [Characters]
 *    parameters:
 *      - in: query
 *        name: size
 *        schema:
 *          type: integer
 *        required: false
 *        description: 골라낼 무작위 캐릭터의 수입니다.
 *        example: 4
 *      - in: query
 *        name: tiers
 *        schema:
 *          type: string
 *          format: integer[]
 *          pattern: "^[1-6](?:,[1-6])*?$"
 *        required: false
 *        description: |
 *          특정 티어에 속한 캐릭터들 중에서만 무작위로 골라냅니다.
 *          여러 티어를 지정하면 지정된 티어들의 합집합에서 고릅니다.
 *          티어 순서가 연속적이거나 정렬되어 있을 필요는 없습니다.
 *          (티어는 1부터 6까지의 정수입니다.)
 *        example: 1,3,4
 *      - in: query
 *        name: fields
 *        schema:
 *          type: string
 *          format: field[]
 *        required: false
 *        description: |
 *          데이터에 받고 싶은 필드를 쉼표로 구분해서 넣어줍니다.
 *          이 쿼리가 없으면 모든 필드가 반환됩니다.
 *        example: id,tier,name_ko,image_photo
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: 요청 성공 여부
 *                  example: true
 *                payload:
 *                  type: array
 *                  items:
 *                    type: object
 *                    additionalProperties:
 *                      type: object
 *                      description: character 데이터입니다.
 */

export { router as characterRouter };
