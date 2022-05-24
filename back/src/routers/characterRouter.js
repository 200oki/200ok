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

router.get("/characters/search/enums/:field", async (req, res, next) => {
  try {
    const result = CharacterService.listCategories(req.params.field);
    res.status(status.STATUS_200_OK).json({
      success: true,
      payload: result,
    });
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

    let found = CharacterService.get(req.params.id, fields);
    if (found.errorMessage) {
      throw new RequestError({ status: found.statusCode }, found.errorMessage);
    }
    res.status(status.STATUS_200_OK).json({ success: true, payload: found });
  } catch (error) {
    next(error);
  }
});

/** /characters/random swaggerdoc
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
let _commentFoldDummy1;
/** /characters/search swaggerdoc
 * @swagger
 * /characters/search:
 *  get:
 *    summary: 캐릭터를 검색하고 페이지로 끊어서 반환합니다.
 *    description: |
 *      `fields` 쿼리로 반환값을 세밀하게 조정할 수 있습니다. (필수) <br>
 *      `props`, `values` 쿼리로 검색어들을 지정합니다. (`AND`) <br>
 *      `page`, `size` 쿼리로 한 페이지만 받습니다. <br>
 *      ----
 *      반환 형식은 다음과 같습니다. 한국어 이름 순으로 정렬되어 있습니다.
 *      ```
 *      {
 *        success: true,
 *        total: totalNumberOfItems,
 *        payload: [ char1, char2, char3, ... ]
 *      }
 *      ```
 *      ----
 *      기본 설정된 예제는 스타일이 "심플"이고 한국어 이름에 "리"가 포함된 캐릭터를
 *      5명씩 나눈 결과의 4페이지를 받아옵니다. <br>
 *      `res.data.total`을 통해 전체 검색 결과 수가 17개인 것을 알 수 있지만,
 *      5명씩 나누어 4페이지므로 결과는 마지막 2개만 반환됩니다.
 *    tags: [Characters]
 *    parameters:
 *      - in: query
 *        name: fields
 *        schema:
 *          type: string
 *          format: field[]
 *        required: true
 *        description: 데이터에 받고 싶은 필드를 쉼표로 구분해서 넣어줍니다.
 *        example: id,name_ko,image_photo
 *      - in: query
 *        name: props
 *        schema:
 *          type: string
 *          format: propertyName[]
 *        required: false
 *        description: |
 *          검색할 프로퍼티의 이름 목록입니다.<br>
 *          프로퍼티가 여러 개이면 항상 `AND` 논리로 검색합니다.
 *          ### 검색이 허용된 프로퍼티 목록과 매치 스킴
 *          | 필드 | 매치 스킴 |
 *          | --- | -------- |
 *          | id | 일치 |
 *          | special | 일치 |
 *          | birthday | 일치 |
 *          | birthday_month | 일치 |
 *          | colors | 최대 두가지 속성중 최소 하나가 문자열 포함 |
 *          | hobby | 문자열 포함 |
 *          | name_ko | 문자열 포함 |
 *          | personality | 문자열 포함 |
 *          | species | 문자열 포함 |
 *          | styles | 최대 두가지 속성중 최소 하나가 문자열 포함 |
 *          | tier | 일치 |
 *          이외의 프로퍼티를 쿼리하면 `405 Method Not Allowed` 에러입니다.
 *        example: name_ko,styles
 *      - in: query
 *        name: values
 *        schema:
 *          type: string
 *          format: propertyValue[]
 *        required: false
 *        description: |
 *          검색할 프로퍼티의 값 목록입니다. props와 순서와 길이가 같아야 합니다.
 *        example: 리,심플
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: |
 *          페이지 번호입니다. 1부터 시작합니다. <br>
 *          `page` 쿼리가 있는데 `size` 쿼리가 없으면 에러입니다.
 *        example: 4
 *      - in: query
 *        name: size
 *        schema:
 *          type: integer
 *        required: false
 *        description: |
 *          한 페이지에 표시할 캐릭터 수입니다. <br>
 *          `size` 쿼리가 있는데 `page` 쿼리가 없으면 에러입니다.
 *        example: 5
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
 *                total:
 *                  type: integer
 *                  description: 총 결과 수
 *                  example: 1
 *                payload:
 *                  type: array
 *                  items:
 *                    type: object
 *                    additionalProperties:
 *                      type: object
 *                      description: character 데이터
 *      400:
 *        description: |
 *          문법이 틀렸거나 유효하지 않은 페이지를 요청했습니다. <br>
 *          아래는 에러 메시지의 목록입니다.
 *          - "fields" query is required
 *          - "page" and "size" both need to be present if one is provided
 *          - Search queries not producing proper pairs
 *          - Won't produce invalid page
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: 요청 성공 여부
 *                  example: false
 *                errorMessage:
 *                  type: string
 *      405:
 *        description: |
 *          존재하지 않거나 검색이 허용되지 않은 필드로 검색을 시도했습니다.
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: 요청 성공 여부
 *                  example: false
 *                errorMessage:
 *                  type: string
 *                  example: "Field name \"field\" either doesn't exist \
 *                    or not searchable"
 *
 */
let _commentFoldDummy2;
/** /characters/search/enums swaggerdoc
 * @swagger
 * /characters/search/enums/{field}:
 *  get:
 *    summary: 캐릭터 데이터의 필드에 어떤 값들이 있는지 반환합니다.
 *    description: |
 *      `payload`는 다음과 같습니다.
 *      ```
 *      [ value1, value2, value3, ]
 *      ```
 *    tags: [Characters]
 *    parameters:
 *      - in: path
 *        name: field
 *        schema:
 *          type: string
 *        required: true
 *        description: |
 *          가능한 값의 목록을 보고 싶은 필드 목록입니다. <br>
 *          다음 중 하나여야 합니다.
 *          - hobby
 *          - personality
 *          - styles
 *          - colors
 *          - species
 *        example: hobby
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
 *                    type: string,
 *                    example: 친절함
 *      404:
 *        description: |
 *          없는 필드이거나 허용되지 않은 필드를 요청했습니다.
 *          - Field name "${field}" either doesn't exist or not peekable
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: 요청 성공 여부
 *                  example: false
 *                errorMessage:
 *                  type: string
 *                  example: Field name \"${field}\" either doesn't \
 *                    exist or not peekable
 */
let _commentFoldDummy3;

export { router as characterRouter };
