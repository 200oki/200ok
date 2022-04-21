import is from "@sindresorhus/is";
import { Router } from "express";
import { ScoreService } from "../services/scoreService.js";
import * as status from "../utils/status.js";

const scoreRouter = Router();

/*** Score will be added to db ***/
scoreRouter.post(
  "/scores",
  async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "필수 파라미터가 존재하지 않습니다."
      );
    }

    const nickname = req.body.nickname;
    const score = req.body.score;

    const newScore = await ScoreService.addScore({
      nickname,
      score,
    });

    if (newScore.errorMessage) {
      throw new Error(newScore.errorMessage);
    }

      res.status(status.STATUS_201_CREATED).json(newScore);
    } catch (err) {
      next(err);
    }
  } 
);

/*** Get current user's rank and score ***/
scoreRouter.get(
  "/scores/:id",
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const userRank = await ScoreService.getUserRank({ id });
  
      if (userRank.errorMessage) {
        throw new Error(userRank.errorMessage);
      }
  
      res.status(status.STATUS_200_OK).send(userRank);
    } catch (err) {
      next(err);
    }
  }
);
    
/*** ranking ***/
scoreRouter.get(
  "/scorelist",
  async function (req, res, next) {
    try {
      const userRank = await ScoreService.getRankList();
  
      if (userRank.errorMessage) {
        throw new Error(userRank.errorMessage);
      }
  
      res.status(status.STATUS_200_OK).send(userRank);
    } catch (err) {
      next(err);
    }
  }
);


export { scoreRouter };