import { CommentService } from "../services/commentService.js";
import { Router } from "express";
import {
  STATUS_201_CREATED,
  STATUS_200_OK,
  STATUS_400_BADREQUEST,
} from "../utils/status.js";
import { validate, notFoundValidate } from "../middlewares/validator.js";
import { check, param, body, query } from "express-validator";
import { logger } from "../utils/winstonLogger.js";
// import { client, checkCache } from "../middlewares/redisMiddleware.js";
const commentRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Comments
 *    description: Comments MVP.
 */

/**
 * @swagger
 * /comments:
 *   post:
 *    summary: 댓글을 생성하는 API
 *    description: |
 *      댓글을 생성할 때 사용하는 API 입니다.
 *
 *      ``Request Body``
 *      ```js
 *       {
 *        "villager" : "주민이름",
 *        "nickname" : "닉네임",
 *        "comment" : " 댓글 내용",
 *        "location" : "댓글 위치"
 *      }
 *    tags: [Comments]
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *            - villager
 *            - nickname
 *            - comments
 *            - location
 *            properties:
 *              villager:
 *                type: string
 *                example: 아그네스
 *              nickname:
 *                type: string
 *                example: tester
 *              comment:
 *                type: string
 *                example: 댓글!
 *              location:
 *                type: string
 *                example: recommendation
 *    responses:
 *      201:
 *        description: 댓글 생성
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
 *                    nickname:
 *                      type: string
 *                      example: 고구마
 *                    comment:
 *                      type: string
 *                      example: 댓글내용
 *                    createdAt:
 *                      type: date
 *                      example: 2022-04-21T17:45:00.308Z
 *      400:
 *        description: 댓글 생성 오류
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
 *                          description: 입력 받을 위치
 */
commentRouter.post(
  "/comments",
  [
    body("comment").exists().withMessage("댓글 내용을 입력해주세요.").bail(),
    body("nickname").exists().withMessage("닉네임을 입력해주세요.").bail(),
    body("location").exists().withMessage("위치를 입력해주세요").bail(),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { villager, comment, nickname, location } = req.body;
      const createdComment = await CommentService.addComment({
        villager,
        nickname,
        comment,
        location,
      });
      const body = {
        success: true,
        payload: createdComment,
      };
      return res.status(STATUS_201_CREATED).json(body);
    } catch (error) {
      error.status = STATUS_400_BADREQUEST;
      logger.warn("Comment Post Catch");
      next(error);
    }
  }
);
/**
 * @swagger
 * /comments?location="댓글 위치"&villager="주민이름":
 *   get:
 *    summary: 댓글을 조회하는 API
 *    description: 댓글을 조회할 때 사용하는 API 입니다.
 *    tags: [Comments]
 *    parameters:
 *      - in: query
 *        name: location
 *        required: true
 *        description: 조회할 댓글이 있는 위치
 *        example: recommendation
 *        schema:
 *          type: string
 *      - in: query
 *        name: villager
 *        description: 주민 이름
 *        example: 아그네스
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        content:
 *          aplication/json:
 *            schema:
 *              type: object
 *              properties:
 *                suceess:
 *                  type: boolean
 *                  description: 응답 여부
 *                  example: true
 *                payload:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      nickname:
 *                        type: string
 *                        example: 고구마
 *                      comment:
 *                        type: string
 *                        example: 댓글내용
 *                      createdAt:
 *                        type: date
 *                        example: 2022-04-21T17:45:00.308Z
 */

/**
 * query: vilager = 주민 이름, location = 댓글 위치
 */
commentRouter.get(
  "/comments",
  [
    query("location")
      .exists()
      .withMessage("query에 location 값을 입력해주세요.")
      .bail(),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { location, villager } = req.query;
      let comments;
      if (villager != null) {
        comments = await CommentService.listComment({
          villager,
          location,
        });
      } else {
        comments = await CommentService.listHonor({ location });
      }
      // await client.set(req.url, JSON.stringify(comments));
      const body = {
        success: true,
        payload: comments,
      };
      return res.status(STATUS_200_OK).json(body);
    } catch (error) {
      error.status = STATUS_400_BADREQUEST;
      logger.warn("Comment Get Catch");
      next(error);
    }
  }
);

/**
 * @swagger
 * /comments?location="댓글 위치":
 *   get:
 *    summary: 댓글을 조회하는 API
 *    description: 댓글을 조회할 때 사용하는 API 입니다.
 *    tags: [Comments]
 *    parameters:
 *      - in: query
 *        name: location
 *        required: true
 *        description: 조회할 댓글이 있는 위치
 *        example: honor
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        content:
 *          aplication/json:
 *            schema:
 *              type: object
 *              properties:
 *                suceess:
 *                  type: string
 *                  description: 응답 여부
 *                  example: true
 *                payload:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      nickname:
 *                        type: string
 *                        example: 고구마
 *                      comment:
 *                        type: string
 *                        example: 댓글내용
 *                      createdAt:
 *                        type: date
 *                        example: 2022-04-21T17:45:00.308Z
 */

export { commentRouter };

// payload:
//  *                  type: object
//  *                  properties:
//  *                    villager:
//  *                      type: string
//  *                      description: 주민 이름.
//  *                      example: 아그네스
//  *                    location:
//  *                      type: string
//  *                      description: 댓글 작성 위치.
//  *                      example: recommendation
//  *                    nickname:
//  *                      type: string
//  *                      description: 댓글 작성자 이름.
//  *                      example: 닉네임
//  *                    comment:
//  *                      type: string
//  *                      description: 댓글 내용
//  *                      example: 얍얍
