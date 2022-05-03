import { Router } from "express";
import { query } from "express-validator";

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

/**
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
 *        "id" : 주민 id
 *      }
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
 *              id:
 *                type: string
 *                example: admiral
 *    responses:
 *      201:
 *        description: count 증가
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
 */

csmRouter.put("/csmdata/counts", async (req, res, next) => {
  const { id } = req.body; // 현재 매칭 캐릭터가 없어서 id로 대체했습니다 적용하시면 수정하겠습니다.
  const up = await CsmService.upCount({ id });
  const body = {
    success: true,
    payload: up,
  };
  return res.status(200).json(body);
});

/**
 * @swagger
 * /csmdata/{id}/counts:
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

  return res.status(200).json(count);
});

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
