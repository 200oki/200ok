import { CsmService } from "../services/csmService.js";
import { Router } from "express";

const csmRouter = Router();

csmRouter.get("/csmdata/:id/counts", async (req, res, next) => {
  const { id } = req.params;
  const count = await CsmService.getCount({ id });

  return res.status(200).json(count);
});

csmRouter.put("/csmdata/counts", async (req, res, next) => {
  const up = await CharacterService.upCount({ villager });
  const body = {
    success: true,
    payload: up,
  };
  return res.status(200).json(body);
});

csmRouter.get("/csmdata/:id?format=best_and_worst", async (req, res, next) => {
  
});
export { csmRouter };