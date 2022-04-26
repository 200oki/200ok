import { Router } from "express";
import { ScoreService } from "../services/scoreService.js";
import { validate, notFoundValidate } from "../middlewares/validator.js";
import { check, body } from "express-validator";
import * as status from "../utils/status.js";

const scoreRouter = Router();

scoreRouter.post(
  "/scores",
  [
    body("nickname")
      .exists()
      .withMessage("닉네임을 입력해주세요.")
      .bail(),
    body("score")
      .exists()
      .withMessage("점수를 입력해주세요.")
      .bail(),
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
    };

    return res.status(status.STATUS_201_CREATED).json(body);
  } 
);

/** query: scores/userId?userId={id} */
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
        detail: "id가 존재하지 않습니다."
      };

      return res.status(status.STATUS_404_NOTFOUND).json(body);
    }

    const body = {
      success: true,
      userRank,
    };

    return res.status(status.STATUS_200_OK).json(body);
  }
);
    
scoreRouter.get(
  "/scores",
  async (req, res, next) => {
    const rankList = await ScoreService.getRankList();

    const body = {
      success: true,
      rankList,
    };

    return res.status(status.STATUS_200_OK).json(body);
  }
);


export { scoreRouter };