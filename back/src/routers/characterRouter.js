import { Router } from "express";

import { CharacterService } from "../services/characterService";
import * as status from "../utils/status";
import { RequestError } from "../utils/errors";

const router = Router();

router.get("/characters", async (req, res, next) => {
  try {
    if (req.query.birthday) {
      // birthday 쿼리가 있을 때는 생일 검색 모드입니다.
      const found = await CharacterService.getByBirthday({
        birthday: req.query.birthday,
      });
      res.status(status.STATUS_200_OK).json({ success: true, payload: found });
    } else {
      // 쿼리가 없으면 전체 캐릭터 이름 사전을 보내줍니다.
      const found = await CharacterService.list();
      res.status(status.STATUS_200_OK).json({ success: true, payload: found });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/characters/:id", async (req, res, next) => {
  try {
    const found = await CharacterService.get({ id: req.params.id });
    if (found.errorMessage) {
      throw new RequestError({ status: found.statusCode }, found.errorMessage);
    }
    res.status(status.STATUS_200_OK).json({ success: true, payload: found });
  } catch (error) {
    next(error);
  }
});

export { router as characterRouter };
