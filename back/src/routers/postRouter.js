import { Router } from "express";
import { PostService } from "../services/postService.js";
import { upload } from "../middlewares/multerMiddleware.js";
import * as status from "../utils/status.js";

const postRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Post
 *    description: Post MVP.
 */

/** Post /posts swaggerdoc
 * @swagger
 * /posts:
 *   post:
 *     summary: 게시글을 올리는 API.
 *     description: |
 *       ``multipart/form-data`` 에서 데이터를 받습니다.
 *       #
 *       ``title``: 게시글 제목
 *       #
 *        ``content``: 게시글 내용
 *       #
 *        ``nickname``: 유저 이름
 *       #
 *        ``images`` : 올릴 이미지 (현재 최대 3개, 각 5MB 의 용량제한)
 *     tags: [Post]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               nickname:
 *                 type: string
 */
postRouter.post("/posts", upload.array("images", 3), async (req, res, next) => {
  if (req.files != null) {
    const images = req.files.map((file) => file.filename);
    const { title, content, nickname } = req.body;
    const post = PostService.createPost({
      title,
      content,
      nickname,
      images,
    });
    res.status(status.STATUS_200_OK).send(post);
  } else {
    const { title, content, nickname } = req.body;
    const post = PostService.createPost({
      title,
      content,
      nickname,
    });
    res.status(status.STATUS_200_OK).send(post);
  }
});

export { postRouter };
