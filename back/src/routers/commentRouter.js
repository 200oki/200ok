import { CommentService } from "../services/commentService.js";
import { Router } from "express";

const commentRouter = Router();

commentRouter.post("/comments", async (req, res, next) => {
  const { villager, comment } = req.body;
  const createComment = await CommentService.addComment({ villager, comment });
  const data = createComment.comment;
  const body = {
    success: true,
    comments: data,
  };
  return res.status(201).json(body);
});

commentRouter.get("/comments/:villager", async (req, res, next) => {
  const { villager } = req.params;
  const comments = await CommentService.listComment({ villager });
  const body = {
    success: true,
    comments,
  };
  return res.status(200).json(body);
});

export { commentRouter };

// 닉네임 넣기 :)
