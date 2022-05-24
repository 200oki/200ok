import { Router } from "express";
import { body } from "express-validator";
import base64 from "base-64";
import utf8 from "utf8";

import { CsmService } from "../services/csmService.js";
import { validate } from "../middlewares/validator.js";
import { RequestError } from "../utils/errors.js";
import * as status from "../utils/status.js";

const csmRouter = Router();

/** `top`, `bottom` 쿼리를 정수로 변환을 시도합니다.
 *
 * @arg {{top: string?, bottom: string?}} kwargs -
 *    `req.query`에 있는 `top`, `bottom` 쿼리입니다.
 *    - nullish이면 0으로 반환합니다. (쿼리가 없음)
 *    - 값이 있지만 변환이 안 되면 Bad Request 에러입니다.
 *    - 값이 정수이지만 0-391 사이가 아니면 역시 Bad Request 에러입니다.
 * @return {[number, number]} `[ top, bottom ]` 순으로 반환합니다.
 */
function parseTopBottomQuery({ top, bottom }) {
  top ??= 0;
  bottom ??= 0;
  top = parseInt(top);
  bottom = parseInt(bottom);
  if (
    isNaN(top) ||
    isNaN(bottom) ||
    top < 0 ||
    bottom < 0 ||
    top > 391 ||
    bottom > 391
  ) {
    throw new RequestError(
      { status: status.STATUS_400_BADREQUEST },
      `Unacceptable "top" or "bottom" value`
    );
  }
  return [top, bottom];
}

/**
 *  @swagger
 *  tags:
 *    name: Csm
 *    description: Csm MVP.
 */

/** GET /csmdata/counts swaggerdoc
 * @swagger
 * /csmdata/counts:
 *   get:
 *    summary: count를 기준으로 상위 3명의 주민을 반환 해주는 API
 *    tags: [Csm]
 *    responses:
 *      200:
 *        description: count를 기준으로 상위 3명의 주민을 반환
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: true
 *                payload:
 *                  payload:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        example: admiral
 *                      name_ko:
 *                        type: string
 *                        example: 일섭
 *                      image_photo:
 *                        type: string
 *                        example: https://acnhcdn.com/latest/NpcBromide/NpcNmlBrd06.png
 *                      count:
 *                        type: number
 *                        example: 16

 */
/** query: [ top=n ] [ bottom=n ] */
csmRouter.get("/csmdata/counts", async (req, res, next) => {
  const rank = await CsmService.getRank();
  const body = {
    success: true,
    payload: rank,
  };
  res.status(status.STATUS_200_OK).json(body);
});

const csmPutBodyMiddleware = async (req, res, next) => {
  // validator의 작동 방식은 아마도 new Date()로 확인하는 것 같으므로
  // 지금 연도가 정해지지 않은 상황에선 별로 쓸모가 없을 듯 합니다.
  // 따라서 수동으로 합니다.
  if (
    !/[01][0-9]-[0-3][0-9]/.test(req.body.birthday) ||
    new Date(req.body.birthday) === "Invalid Date"
  ) {
    next(
      new RequestError(
        { status: status.STATUS_400_BADREQUEST },
        `Invalid "birthday" format`
      )
    );
  } else {
    next();
  }
};

/** PUT /csmdata/counts swaggerdoc
 * @swagger
 * /csmdata/counts:
 *   put:
 *    summary: count 를 1 증가 시켜주는 API
 *    description: |
 *      매칭이 됐을 때, 카운트를 증가시켜줍니다.
 *
 *      ``Request Body``
 *      ```js
 *       {
 *        "birthday": "MM-DD",
 *        "hobby": "string",
 *        "personality": "string",
 *        "colors": "array",
 *        "styles": "array"
 *       }
 *      ```
 *    tags: [Csm]
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *            - id
 *            properties:
 *             birthday:
 *               type: string
 *               example: 03-24
 *             hobby:
 *               type: string
 *               example: "음악"
 *             personality:
 *               type: string
 *               example: "친절함"
 *             colors:
 *               type: array
 *               example: ["검정색", "파란색"]
 *             styles:
 *               type: array
 *               example: ["심플", "쿨"]
 *    responses:
 *      200:
 *        description: 나와 매칭된 주민의 카운트를 1 증가
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                suceess:
 *                  type: string
 *                  description: 응답 여부
 *                  example: true
 *                payload:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: lolly
 *                    uuid:
 *                      type: string
 *                      example: b6ffb2be-5d4b-4707-9f53-5a16a4d7fae0
 *                    character:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          example: lolly
 *                        name_ko:
 *                          type: string
 *                          example: 사이다
 *                        image_photo:
 *                          type: string
 *                          example: https://acnhcdn.com/latest/NpcBromide/NpcNmlCat18.png
 *                    distance:
 *                      type: number
 *                      example: 1.1253414782291422
 *                    count:
 *                      type: number
 *                      example: 6
 */
csmRouter.put(
  "/csmdata/counts",
  [
    csmPutBodyMiddleware,
    body(["hobby", "personality"])
      .isString()
      .withMessage(`"Invalid "hobby" or "personality" format`),
    body(["colors", "styles"])
      .isArray({ min: 1, max: 2 })
      .withMessage(`Invalid "colors" or "styles" format`),
    validate,
  ],
  async (req, res, next) => {
    try {
      const mostSimilar = CsmService.csm({ ...req.body });
      const id = mostSimilar.id;
      const up = await CsmService.upCount({ id });
      const body = {
        success: true,
        payload: {
          id,
          uuid: up.uuid,
          character: mostSimilar.character,
          distance: mostSimilar.distance,
          count: up.count,
        },
      };
      // console.log(body);
      return res.status(status.STATUS_200_OK).json(body);
    } catch (error) {
      next(error);
    }
  }
);

/** GET /csmdata/share/:code swaggerdoc
 * @swagger
 * /csmdata/share/{code}:
 *   get:
 *    summary: 사용자 csm 정보를 재현합니다.
 *    description: |
 *      `PUT /csmdata/counts`와 비슷하지만 매칭 카운트를 올리지 않습니다.
 *    tags: [Csm]
 *    parameters:
 *      - in: path
 *        name: code
 *        required: true
 *        description: |
 *          `PUT /csmdata/counts`를 json화한 후 `base64` 코덱으로 인코딩한
 *          문자열입니다.
 *        example: |
 *          eyJiaXJ0aGRheSI6IjAzLTE0IiwiY29sb3JzIjpbIu2Vke2BrOyDiSJdLCJwZXJzb25hbGl0eSI6IuyEseyIme2VqCIsImhvYmJ5Ijoi7J2M7JWFIiwic3R5bGVzIjpbIuyVoe2LsOu4jCJdfQ==
 *        schema:
 *          type: string
 *          format: json.utf8.base64
 *    responses:
 *      200:
 *        description: 매칭 기록 재현에 성공했습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: true
 *                payload:
 *                   type: object
 *                   properties:
 *                    id:
 *                      type: string
 *                      example: admiral
 *                    character:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          example: judy
 *                        name_ko:
 *                          type: string
 *                          example: 미애
 *                        image_photo:
 *                          type: string
 *                          example: https://acnhcdn.com/latest/NpcBromide/NpcNmlCbr19.png
 *                    distance:
 *                      type: number
 *                      example: 1.1277667859523386
 *                    count:
 *                      type: number
 *                      example: 1
 *                    total:
 *                      type: number
 *                      example: 417
 */
csmRouter.get(
  "/csmdata/share/:code",
  async (req, res, next) => {
    try {
      const jsonStr = utf8.decode(base64.decode(req.params.code));
      const payload = JSON.parse(jsonStr);
      req.body = { ...payload };
      next();
    } catch (error) {
      next(error);
    }
  },
  [
    csmPutBodyMiddleware,
    body(["hobby", "personality"])
      .isString()
      .withMessage(`"Invalid "hobby" or "personality" format`),
    body(["colors", "styles"])
      .isArray({ min: 1, max: 2 })
      .withMessage(`Invalid "colors" or "styles" format`),
    validate,
  ],
  async (req, res, next) => {
    try {
      const mostSimilar = CsmService.csm({ ...req.body });
      const id = mostSimilar.id;
      const count = await CsmService.getCount({ id });
      const body = {
        success: true,
        payload: {
          id,
          character: mostSimilar.character,
          distance: mostSimilar.distance,
          ...count.payload,
        },
      };
      res.status(status.STATUS_200_OK).json(body);
    } catch (error) {
      next(error);
    }
  }
);

/** GET /csmdata/:id/count swaggerdoc
 * @swagger
 * /csmdata/{id}/count:
 *   get:
 *    summary: counts를 포함한 주민 데이터를 반환해주는 API
 *    description: |
 *      counts를 포함한 주민 데이터를 반환
 *    tags: [Csm]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 주민 id
 *        example: admiral
 *        schema:
 *          type: string
 *    responses:
 *      201:
 *        description: 주민 데이터 반환
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: true
 *                payload:
 *                   type: object
 *                   properties:
 *                    id:
 *                      type: string
 *                      example: admiral
 *                    name_ko:
 *                      type: string
 *                      example: 일섭
 *                    image_photo:
 *                      type: string
 *                      example: https://acnhcdn.com/latest/NpcBromide/NpcNmlBrd06.png
 *                    count:
 *                      type: number
 *                      example: 16
 *                    total:
 *                      type: number
 *                      example: 16
 *                    avg:
 *                      type: number
 *                      example: 100
 */
csmRouter.get("/csmdata/:id/count", async (req, res, next) => {
  const { id } = req.params;
  const count = await CsmService.getCount({ id });

  return res.status(status.STATUS_200_OK).json(count);
});

/** GET /csmdata/:id swaggerdoc
 * @swagger
 * /csmdata/{id}:
 *  get:
 *    summary: |
 *      `id`와 일치하는 캐릭터와 유사한 캐릭터들의 요약을 배열로 반환합니다.
 *    description: |
 *      **쿼리 설명**
 *      - `top`과 `bottom`은 각각 유사도 상위/하위권에서 자를 숫자입니다.
 *      - `top`과 `bottom`이 모두 0이면 전체 유사도 배열을 반환합니다.
 *      - `top` 또는 `bottom` 중 하나가 지정되면 그 부분만 반환합니다.
 *      - 둘 모두가 지정되면 `[ ...top, ...bottom ]` 형식으로 반환합니다.
 *      - 어떤 경우에도 순서는 유사도 상위 -> 하위 순입니다.
 *      ----
 *      반환 형식은 다음과 같습니다. 순서는 언제나 유사도 상위->하위 순입니다.
 *      ```
 *      {
 *        success: true,
 *        payload: [ { id, distance, character, }, ]
 *      }
 *      ```
 *    tags: [Csm]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: |
 *          유사도를 보고 싶은 캐릭터의 `id`입니다.
 *        example: admiral
 *      - in: query
 *        name: top
 *        schema:
 *          type: integer
 *          minimum: 0
 *          maximum: 391
 *        required: false
 *        description: 유사도 상위 n 명을 끊어서 반환합니다.
 *        example: 1
 *      - in: query
 *        name: bottom
 *        schema:
 *          type: integer
 *          minimum: 0
 *          maximum: 391
 *        required: false
 *        description: 유사도 하위 n 명을 끊어서 반환합니다.
 *        example: 1
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
 *                    properties:
 *                      id:
 *                        type: string
 *                        example: ike
 *                      distance:
 *                        type: number
 *                        example: 0.9
 *                      character:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            example: ike
 *                          name_ko:
 *                            type: string
 *                            example: 대공
 *                          image_photo:
 *                            type: string
 *                            example: "https://image_url.com"
 *                          image_icon:
 *                            type: string
 *                            example: "https://image_url.com"
 *      400:
 *        description: |
 *          요청 문법이 틀렸습니다. <br>
 *          아래는 에러 메시지의 목록입니다.
 *          - Unacceptable "top" or "bottom" value
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
 *      404:
 *        description: |
 *          유효하지 않은 페이지를 요청했습니다. <br>
 *          아래는 에러 메시지의 목록입니다.
 *          - {${id}} is either non-existent or not csm'able
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
 */
/** query: [ top=n ] [ bottom=n ] */
csmRouter.get("/csmdata/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const [top, bottom] = parseTopBottomQuery(req.query);

    const result = CsmService.getSimilarCharsOf({ id, top, bottom });
    res.status(status.STATUS_200_OK).json({ success: true, payload: result });
  } catch (error) {
    next(error);
  }
});

export { csmRouter };
