import { CommentService } from "../services/commentService.js";
import { Router } from "express";
import { STATUS_201_CREATED, STATUS_200_OK } from "../utils/status.js";
import { validate, notFoundValidate } from "../middlewares/validator.js";
import { check, param, body, header } from "express-validator";
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
 *    description: 댓글을 생성할 때 사용하는 API 입니다.
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
 *                comments:
 *                  type: object
 *                  properties:
 *                    villager:
 *                      type: string
 *                      description: 주민 이름.
 *                      example: 아그네스
 *                    location:
 *                      type: string
 *                      description: 댓글 작성 위치.
 *                      example: recommendation
 *                    nickname:
 *                      type: string
 *                      description: 댓글 작성자 이름.
 *                      example: 닉네임
 *                    comment:
 *                      type: string
 *                      description: 댓글 내용
 *                      example: 얍얍
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
    body("villager")
      .exists()
      .withMessage("주민 이름을 body에 담아주세요")
      .bail(),
    body("comment").exists().withMessage("댓글 내용을 입력해주세요.").bail(),
    body("nickname").exists().withMessage("닉네임을 입력해주세요.").bail(),
    body("location").exists().withMessage("위치를 입력해주세요").bail(),
    validate,
  ],
  async (req, res, next) => {
    const { villager, comment, nickname, location } = req.body;
    const createdComment = await CommentService.addComment({
      villager,
      comment,
      nickname,
      location,
    });
    // const data = createComment.comment;
    const body = {
      success: true,
      comments: createdComment,
    };
    return res.status(STATUS_201_CREATED).json(body);
  }
);
/**
 * @swagger
 * /comments/{villager}:
 *   get:
 *    summary: 댓글을 조회하는 API
 *    description: 댓글을 조회할 때 사용하는 API 입니다.
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: villager
 *        required: true
 *        description: 주민 이름
 *        example: 아그네스
 *        schema:
 *          type: string
 *      - in: header
 *        name: location
 *        required: true
 *        description: 조회할 댓글이 있는 위치
 *        example: recommendation
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
 *                comments:
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

commentRouter.get(
  "/comments/:villager",
  [
    check("villager")
      .trim()
      .isLength({ min: 1 })
      .exists()
      .withMessage("parameter 값으로 주민 이름을 입력해주세요.")
      .bail(),
    notFoundValidate,
    header("location")
      .exists()
      .withMessage("header에 location 값을 입력해주세요.")
      .bail(),
    validate,
  ],
  async (req, res, next) => {
    const { location } = req.headers;
    const { villager } = req.params;
    const comments = await CommentService.listComment({ villager, location });
    const body = {
      success: true,
      comments,
    };
    return res.status(STATUS_200_OK).json(body);
  }
);

export { commentRouter };

// 닉네임 넣기 :)
