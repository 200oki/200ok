import { Router } from "express";
import { statList } from "../db/publicSchemas/stats.js";
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
 * /stats/{groupName}:
 *  get:
 *    summary: 컬럼 값으로 그룹핑하는 API
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
 *                    groupName:
 *                      type: string
 *                      description: groupby 하는 값
 *                      example: gender
 *                    colName:
 *                      type: string
 *                      description: groupby 행 배열
 *                      example: 여성
 *                    counts:
 *                      type: number
 *                      description: groupby count 배열
 *                      example: 10
 *
 */
statRouter.get(
  "/stats",
  [
    check("groupName")
      .trim()
      .isLength({ min: 1 })
      .exists()
      .withMessage("parameter 값으로 컬럼명을 입력해주세요.")
      .bail(),
    notFoundValidate,
    validate,
  ],
  async (req, res, next) => {
    const groupName = req.query.groupName;
    const index = statList.findIndex((x) => x.groupName === groupName);

    if (index === -1) {
      const body = {
        success: false,
      };
      return res.status(status.STATUS_400_BADREQUEST).json(body);
    }

    const body = {
      success: true,
      payload: statList[index],
    };

    return res.status(status.STATUS_200_OK).json(body);
  }
);

export { statRouter };
