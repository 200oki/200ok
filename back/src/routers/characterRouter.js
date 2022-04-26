import { Router } from "express";

import { CharacterService } from "../services/characterService.js";
import * as status from "../utils/status.js";
import { RequestError } from "../utils/errors.js";

const router = Router();

/**
 *  @swagger
 *  tags:
 *    name: Characters
 *    description: Characters MVP API 문서입니다.
 */

/** query: birthday=mm-dd[ &fields=name_ko,name_en ] */
router.get("/characters", async (req, res, next) => {
  try {
    let found;
    if (req.query.birthday) {
      // birthday 쿼리가 있을 때는 오늘의 생일 모드입니다.
      // 쿼리에 원하는 필드값을 넣을 수 있습니다.
      let fields = [];
      if (req.query.fields) {
        fields = req.query.fields.split(",");
      }
      found = await CharacterService.getByBirthday({
        birthday: req.query.birthday,
        fields,
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

/** query: fields=name_ko,name_en */
router.get("/characters/:id", async (req, res, next) => {
  try {
    // 쿼리에 원하는 필드값을 넣을 수 있습니다.
    let fields = [];
    if (req.query.fields) {
      fields = req.query.fields.split(",");
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
