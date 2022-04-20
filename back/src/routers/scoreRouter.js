import is from "@sindresorhus/is";
import { Router } from "express";
import { ScoreService } from "../services/scoreService";

const ScoreRouter = Router();

/*** Score will be added to db ***/
ScoreRouter.post(
  "/score/create",
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

      res.status(201).json(newScore);
    } catch (err) {
      next(err);
    }
  } 
);

/*** Get current user's rank and score ***/
ScoreRouter.get(
  "/score/:id",
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const userRank = await ScoreService.getUserRank({ id });
  
      if (userRank.errorMessage) {
        throw new Error(userRank.errorMessage);
      }
  
      res.status(200).send(userRank);
    } catch (err) {
      next(err);
    }
  }
);
    
/*** ranking ***/
ScoreRouter.get(
  "/scorelist",
  async function (req, res, next) {
    try {
      const rankList = await ScoreService.getRanklist();
  
      if (rankList.errorMessage) {
        throw new Error(rankList.errorMessage);
      }
  
      res.status(200).send(rankList);
    } catch (err) {
      next(err);
    }
  }
);


export { ScoreRouter };