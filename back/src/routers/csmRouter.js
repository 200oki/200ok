import { Router } from "express";
import { body, query } from "express-validator";

import { CsmService } from "../services/csmService.js";
import { validate } from "../middlewares/validator.js";
import { RequestError } from "../utils/errors.js";
import * as status from "../utils/status.js";

const csmRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Csm
 *    description: Csm MVP.
 */

/** @todo GET /csmdata/counts 라우팅 */

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
 */
csmRouter.put(
  "/csmdata/counts",
  [
    // body("birthday")
    //   .isDate({ format: "MM-DD", strictMode: true })
    //   .withMessage(`Invalid "birthday" format`)
    //   .bail(),
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
      // validator의 작동 방식은 아마도 new Date()로 확인하는 것 같으므로
      // 지금 연도가 정해지지 않은 상황에선 별로 쓸모가 없을 듯 합니다.
      // 따라서 수동으로 합니다.
      if (
        !/[01][0-9]-[0-3][0-9]/.test(req.body.birthday) ||
        new Date(req.body.birthday) === "Invalid Date"
      ) {
        throw new RequestError(
          { status: status.STATUS_400_BADREQUEST },
          `Invalid "birthday" format`
        );
      }

      const mostSimilar = await CsmService.csm({ ...req.body });
      const id = mostSimilar.id;
      const up = await CsmService.upCount({ id });
      const body = {
        success: true,
        payload: {
          id,
          character: mostSimilar.character,
          distance: mostSimilar.distance,
          count: up.count,
          /** @todo avg, total? */
          /** @todo 캐릭터데이터 소스를 이원화하는 건 아주 안좋다고 봅니다. */
        },
      };
      console.log(body);
      return res.status(status.STATUS_200_OK).json(body);
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

/** GET /csmdata/:id swagger 문서
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
csmRouter.get(
  "/csmdata/:id",
  [
    query(["top", "bottom"])
      .isInt({ min: 0, max: 391 })
      .withMessage(`Unacceptable "top" or "bottom" value`),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const top = parseInt(req.query.top) || 0;
      const bottom = parseInt(req.query.bottom) || 0;

      const result = CsmService.getSimilarCharsOf({ id, top, bottom });
      res.status(status.STATUS_200_OK).json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

export { csmRouter };
