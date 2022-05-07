import { Router } from "express";
import { ScoreService } from "../services/scoreService.js";
import { validate, notFoundValidate } from "../middlewares/validator.js";
import { check, body } from "express-validator";
import * as status from "../utils/status.js";

const scoreRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Scores
 *    description: Scores MVP
 */
/**
 * @swagger
 * /scores:
 *   post:
 *    summary: 점수 생성 API
 *    description: 점수를 생성할 때 사용하는 API 입니다.
 *    tags: [Scores]
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *            - nickname
 *            - score
 *            properties:
 *              nickname:
 *                type: string
 *                example: tester
 *              score:
 *                type: number
 *                example: 5
 *    responses:
 *      201:
 *        description: 점수 생성
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
 *                    id:
 *                      type: string
 *                      description: 무작위 생성 아이디
 *                      example: 무작위 생성 아이디
 *                    nickname:
 *                      type: string
 *                      description: 게임한 유저 이름
 *                      example: 닉네임
 *                    score:
 *                      type: number
 *                      description: 점수
 *                      example: 5
 *      400:
 *        description: 점수 생성 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 400
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: 닉네임을 입력해주세요.
 *                    detail:
 *                      type: object
 *                      description: 오류 세부 사항
 *                      properties:
 *                        msg:
 *                          type: string
 *                          description: 오류 내용
 *                          example: 닉네임을 입력해주세요.
 *                        param:
 *                          type: string
 *                          description: 입력하지 않은 파라미터
 *                          example: nickname
 *                        location:
 *                          type: string
 *                          description: 입력받을 위치
 *
 */
scoreRouter.post(
  "/scores",
  [
    body("nickname").exists().withMessage("닉네임을 입력해주세요.").bail(),
    body("score").exists().withMessage("점수를 입력해주세요.").bail(),
    validate,
  ],
  async (req, res, next) => {
    const { nickname, score } = req.body;
    const newScore = await ScoreService.addScore({
      nickname,
      score,
    });

    const body = {
      success: true,
      payload: newScore,
    };

    return res.status(status.STATUS_201_CREATED).json(body);
  }
);

/** query: scores/userId?userId={id} */
/**
 * @swagger
 * /scores/userId/{userId}:
 *   get:
 *    summary: 유저 점수 & 랭크 조회 API
 *    description: 유저 점수 & 랭크를 조회할 때 사용하는 API 입니다.
 *    tags: [Scores]
 *    parameters:
 *      - in: query
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: 유저 점수 & 랭크를 반환합니다.
 *    responses:
 *      200:
 *        description: 점수 & 랭크 조회
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
 *                    id:
 *                      type: string
 *                      description: 무작위 생성 아이디
 *                      example: 무작위 생성 아이디
 *                    nickname:
 *                      type: string
 *                      description: 게임한 유저 이름
 *                      example: 닉네임
 *                    score:
 *                      type: number
 *                      description: 점수
 *                      example: 5
 *                    rank:
 *                      type: number
 *                      description: 점수
 *                      example: 1
 *
 *      400:
 *        description: 점수 & 랭크 조회 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 400
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: id가 존재하지 않습니다.
 *                    detail:
 *                      type: string
 *                      description: id가 존재하지 않습니다.
 *
 */
scoreRouter.get(
  "/scores/userId",
  [
    check("userId")
      .trim()
      .isLength({ min: 1 })
      .exists()
      .withMessage("parameter 값으로 유저 아이디를 입력해주세요.")
      .bail(),
    notFoundValidate,
    validate,
  ],
  async (req, res, next) => {
    const id = req.query.userId;
    const userRank = await ScoreService.getUserRank({ id });

    if (userRank === undefined) {
      const body = {
        success: false,
        detail: "id가 존재하지 않습니다.",
      };

      return res.status(status.STATUS_400_BADREQUEST).json(body);
    }

    const body = {
      success: true,
      payload: userRank,
    };

    return res.status(status.STATUS_200_OK).json(body);
  }
);

/**
 * @swagger
 * /scores:
 *   get:
 *    summary: 랭킹 조회 API
 *    description: 랭킹을 조회할 때 사용하는 API 입니다.
 *    tags: [Scores]
 *    responses:
 *      200:
 *        description: 랭킹 조회. 배열 오브젝트를 반환합니다.
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
 *                    id:
 *                      type: string
 *                      description: 무작위 생성 아이디
 *                      example: 무작위 생성 아이디
 *                    nickname:
 *                      type: string
 *                      description: 게임한 유저 이름
 *                      example: 닉네임
 *                    score:
 *                      type: number
 *                      description: 점수
 *                      example: 5
 *                    rank:
 *                      type: number
 *                      description: 랭크
 *                      example: 1
 *
 */
scoreRouter.get("/scores", async (req, res, next) => {
  const rankList = await ScoreService.getRankList();

  const body = {
    success: true,
    payload: rankList,
  };

  return res.status(status.STATUS_200_OK).json(body);
});

export { scoreRouter };
