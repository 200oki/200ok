import { Router } from "express";

import { CharacterService } from "../services/characterService";
import * as status from "../utils/status";
import { RequestError } from "../utils/errors";

const router = Router();

router.get("/characters", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/characters/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export { router as characterRouter };
