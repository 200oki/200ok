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


export { ScoreRouter };