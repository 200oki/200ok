import { Router } from "express";

import { CharacterService } from "../services/characterService.js";
import * as status from "../utils/status.js";
import { RequestError } from "../utils/errors.js";

const router = Router();

/** query: birthday=mm-dd */
router.get("/characters", async (req, res, next) => {
  try {
    let found;
    if (req.query.birthday) {
      // birthday 쿼리가 있을 때는 오늘의 생일 모드입니다.
      found = await CharacterService.getByBirthday({
        birthday: req.query.birthday,
      });
    } else {
      // 쿼리가 없으면 전체 캐릭터 이름 사전을 보내줍니다.
      found = await CharacterService.list();
    }

    res.status(status.STATUS_200_OK).json({ success: true, payload: found });
  } catch (error) {
    next(error);
  }
});

/** query: fields=["name_ko", "birthday"] */
router.get("/characters/:id", async (req, res, next) => {
  try {
    // 쿼리에 원하는 필드값을 넣을 수 있습니다.
    let fields = [];
    if (req.query.fields) {
      try {
        fields = JSON.parse(fields);
      } catch (error) {
        throw new RequestError("Invalid JSON format");
      }
      if (!Array.isArray(fields)) {
        throw new RequestError("Invalid query format");
      }
    }

    let found = await CharacterService.get({ id: req.params.id, fields });
    if (found.errorMessage) {
      throw new RequestError({ status: found.statusCode }, found.errorMessage);
    }
    res.status(status.STATUS_200_OK).json({ success: true, payload: found });
  } catch (error) {
    next(error);
  }
});

export { router as characterRouter };
