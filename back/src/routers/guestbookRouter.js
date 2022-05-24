import { Router } from "express";
import { GuestbookService } from "../services/guestbookService.js";
import { validate, notFoundValidate } from "../middlewares/validator.js";
import { check, body } from "express-validator";
import * as status from "../utils/status.js";

const guestbookRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Guestbook
 *    description: Guestbook MVP
 */
/**
 * @swagger
 * /guestbook:
 *   post:
 *    summary: 방명록 API
 *    description: 방명록을 생성할 때 사용하는 API 입니다.
 *    tags: [Guestbook]
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *            - content
 *            properties:
 *              content:
 *                type: string
 *                example: tester
 *    responses:
 *      201:
 *        description: 방명록 생성
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
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    content:
 *                      type: string
 *                      description: 방명록 내용
 *                      example: 안녕
 *      400:
 *        description: 방명록 생성 오류
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
 *                      example: 글을 입력해주세요.
 *                    detail:
 *                      type: object
 *                      description: 오류 세부 사항
 *                      properties:
 *                        msg:
 *                          type: string
 *                          description: 오류 내용
 *                          example: 글을 입력해주세요.
 *
 */
guestbookRouter.post(
  "/guestbooks",
  [body("content").exists().withMessage("글을 입력해주세요.").bail(), validate],
  async (req, res, next) => {
    const { content } = req.body;
    const newGuestbook = await GuestbookService.addGuestbook({
      content,
    });

    const body = {
      success: true,
      payload: newGuestbook,
    };

    return res.status(status.STATUS_201_CREATED).json(body);
  }
);

/**
 * @swagger
 * /guestbooks/userId/{id}:
 *   get:
 *    summary: 방명록 조회 API
 *    description: 방명록 조회할 때 사용하는 API 입니다.
 *    tags: [Guestbooks]
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: 방명록 글을 반환합니다.
 *    responses:
 *      200:
 *        description: 방명록 조회
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
 *                      type: number
 *                      description: id
 *                      example: id
 *                    content:
 *                      type: string
 *                      description: 방명록 내용
 *                      example: 안녕
 *
 *      400:
 *        description: 방명록 조회 오류
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
guestbookRouter.get(
  "/guestbooks/userId",
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
    const userGuestbook = await GuestbookService.getGuestbook({ id });
    if (userGuestbook === null) {
      const body = {
        success: false,
        detail: "id가 존재하지 않습니다.",
      };

      return res.status(status.STATUS_400_BADREQUEST).json(body);
    }

    const body = {
      success: true,
      payload: userGuestbook,
    };

    return res.status(status.STATUS_200_OK).json(body);
  }
);

/**
 * @swagger
 * /guestbooks/userId/{id}:
 *   get:
 *    summary: 방명록 조회 API
 *    description: 방명록 조회할 때 사용하는 API 입니다.
 *    tags: [Guestbooks]
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: 방명록 글을 반환합니다.
 *    responses:
 *      200:
 *        description: 방명록 조회
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
 *                      type: number
 *                      description: id
 *                      example: id
 *                    content:
 *                      type: string
 *                      description: 방명록 내용
 *                      example: 안녕
 *
 *      400:
 *        description: 방명록 조회 오류
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
guestbookRouter.get("/guestbooks", async (req, res, next) => {
  const userGuestbook = await GuestbookService.getGuestbookList();
  const body = {
    success: true,
    payload: userGuestbook,
  };

  return res.status(status.STATUS_200_OK).json(body);
});

export { guestbookRouter };
