import { Router } from "express";

import { CharacterService } from "../services/characterService.js";
import * as status from "../utils/status.js";
import { RequestError } from "../utils/errors.js";

const router = Router();

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

    let result = CharacterService.sample(size, tiers, fields);
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
router.get(
  "/characters/search",
  async (req, res, next) => {
    // 미들웨어로 쿼리만 검증합니다.
    if (!("fields" in req.query)) {
      next(
        new RequestError(
          { status: status.STATUS_400_BADREQUEST },
          `"fields" query is required`
        )
      );
    }
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    // page, size 쿼리는 없어도 되지만 있으려면 둘 다 있어야 합니다.
    if (isNaN(page) != isNaN(size)) {
      next(
        new RequestError(
          { status: status.STATUS_400_BADREQUEST },
          `"page" and "size" both need to be present if one is provided`
        )
      );
    }
    req.query.fields = parseArrayQuery(req.query.fields);
    req.query.props = parseArrayQuery(req.query.props);
    req.query.values = parseArrayQuery(req.query.values);
    req.query.page = page;
    req.query.size = size;
    next();
  },
  async (req, res, next) => {
    try {
      const { fields, props, values, page, size } = req.query;

      let result = CharacterService.search(props, values, fields);
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
  }
);

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
 * /characters?birthday=mm-dd [ &fields=field1,field2,... ]:
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
      found = CharacterService.getByBirthday({
        birthday: req.query.birthday,
        fields,
      });
    } else {
      // 쿼리가 없으면 전체 캐릭터 이름 사전을 보내줍니다.
      found = CharacterService.list();
    }

    res.status(status.STATUS_200_OK).json({ success: true, payload: found });
  } catch (error) {
    next(error);
  }
});

/** query: fields=name_ko,name_en */
/**
 * @swagger
 * /characters/:id [ &fields=field1,field2,... ]:
 *  get:
 *    summary: id와 일치하는 캐릭터를 반환합니다.
 *    description: 한 캐릭터의 데이터를 전부 또는 일부 반환합니다.
 *    tags: [Characters]
 *    parameters:
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
    let fields = [];
    if (req.query.fields) {
      fields = req.query.fields.split(",");
    }

    let found = CharacterService.get(req.params.id, fields);
    if (found.errorMessage) {
      throw new RequestError({ status: found.statusCode }, found.errorMessage);
    }
    res.status(status.STATUS_200_OK).json({ success: true, payload: found });
  } catch (error) {
    next(error);
  }
});

export { router as characterRouter };
