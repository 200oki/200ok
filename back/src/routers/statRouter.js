import { Router } from "express";
import { StatService } from "../services/statService.js";
import { validate, notFoundValidate } from "../middlewares/validator.js";
import { check } from "express-validator";
import * as status from "../utils/status.js";

const statRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Stat
 *    description: Stat MVP
 */
/**
 * @swagger
 * /stats/:columns:
 *   get:
 *    summary: 컬럼 값으로 조회 API
 *    description: 컬럼을 조회할 때 사용하는 API 입니다.
 *    tags: [Stats]
 *    responses:
 *      200:
 *        description: 컬럼 조회. 열값과 카운트를 반환합니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: true
 *                payload:
 *                  type: object
 *                  properties:
 *                    xLabel:
 *                      type: string
 *                      description: 컬럼 groupby한 값
 *                      example: Female
 *                    yLabel:
 *                      type: string
 *                      description: 컬럼별 count 값
 *                      example: 10
 *                                       
*/
statRouter.get(
  "characters/stats",
  [
    check("columnName")
    .trim()
    .isLength({ min: 1 })
    .exists()
    .withMessage("parameter 값으로 컬럼 이름을 입력해주세요.")
    .bail(),
    notFoundValidate,
    validate,
  ],
  async (req, res, next) => {
    const columnName = req.query.columnName;
    console.log("Router :", columnName);
    const columnList = await StatService.getColumnList({ columnName });

    const body = {
      success: true,
      payload: columnList,
    };

    return res.status(status.STATUS_200_OK).json(body);
  }
);


export { statRouter };