import is from "@sindresorhus/is";
import { Router } from "express";
import { ScoreService } from "../services/scoreService.js";
import * as status from "../utils/status";

const scoreRouter = Router();

/*** Score will be added to db ***/
scoreRouter.post("/scores", async function (req, res, next) {
  try {
    const nickname = req.body.nickname;
    const score = req.body.score;
    const newScore = await ScoreService.addScore({
      nickname,
      score,
    });
    const body = {
      success: true,
      user: newScore,
    };

    return res.status(status.STATUS_201_CREATED).json(body);
  } catch (error) {
    next(error);
  }
});

/*** Get current user's rank and score ***/
scoreRouter.get("/scores/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const userRank = await ScoreService.getUserRank({ id });
    const body = {
      success: true,
      user: userRank,
    };

    return res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

/*** ranking ***/
scoreRouter.get("/scorelist", async function (req, res, next) {
  try {
    const rankList = await ScoreService.getRankList();
    const body = {
      success: true,
      user: rankList,
    };

    return res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

export { scoreRouter };
