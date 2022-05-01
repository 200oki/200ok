import { Router } from "express";
import { GuestbookService } from "../services/GuestbookService.js";
import { validate, notFoundValidate } from "../middlewares/validator.js";
import { check, body } from "express-validator";
import * as status from "../utils/status.js";

const guestbookRouter = Router();

guestbookRouter.post(
  "/guestbooks",
  [
    body("content")
      .exists()
      .withMessage("글을 입력해주세요.")
      .bail(),
    validate,
  ],
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

export { guestbookRouter };