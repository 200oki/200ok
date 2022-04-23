import { CommentService } from "../services/commentService.js";
import { Router } from "express";
import { STATUS_201_CREATED, STATUS_200_OK } from "../utils/status.js";
import { validate, notFoundValidate } from "../middlewares/validator.js";
import { check, param, body, header } from "express-validator";
const commentRouter = Router();

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
    const createComment = await CommentService.addComment({
      villager,
      comment,
      nickname,
      location,
    });
    // const data = createComment.comment;
    const body = {
      success: true,
    };
    return res.status(STATUS_201_CREATED).json(body);
  }
);

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
