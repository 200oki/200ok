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
 *     responses:
 *       "201":
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suceess:
 *                   type: boolean
 *                   description: 응답 여부
 *                   example: true
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: eabcb635-8127-4185-98cf-61d0328f011f
 *                     title:
 *                       type: string
 *                       example: 게시글 제목
 *                     content:
 *                       type: string
 *                       example: 게시글 내용
 *                     nickname:
 *                       type: string
 *                       example: 닉네임
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 1651730614927docker.png
 *                     createdAt:
 *                       type: date
 *                       example: 2022-04-21T17:45:00.308Z
 */
postRouter.post("/posts", upload.array("images", 3), async (req, res, next) => {
  try {
    if (req.files != null) {
      const images = req.files.map((file) => file.filename);
      const { title, content, nickname } = req.body;
      const post = await PostService.createPost({
        title,
        content,
        nickname,
        images,
      });
      const body = {
        success: true,
        payload: post,
      };
      res.status(status.STATUS_201_CREATED).send(body);
    } else {
      const { title, content, nickname } = req.body;
      const post = await PostService.createPost({
        title,
        content,
        nickname,
      });
      const body = {
        success: true,
        payload: post,
      };
      res.status(status.STATUS_201_CREATED).send(body);
    }
  } catch (error) {
    next(error);
  }
});

/** GET /posts swaggerdoc
 * @swagger
 * /posts:
 *   get:
 *     summary: 전체 post를 조회하는 API
 *     description: |
 *       ## 반환형식
 *       ```js
 *       {
 *         success: true,
 *         payload: [{
 *        "id": "31aa8971-0954-47e5-9d37-92a8367ba283",
 *        "title": "제목테스트",
 *        "content": "내용 테스트",
 *        "nickname": "닉네임 테스트",
 *        "images": [
 *            "1651730176428docker.png",
 *            "1651730176429error.gif",
 *            "1651730176463rocket.png"
 *        ],
 *        "createdAt": "2022-05-05T05:56:16.494Z"
 *        }]
 *        }
 *       ```
 *     tags: [Post]
 *     responses:
 *       "200":
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suceess:
 *                   type: boolean
 *                   description: 응답 여부
 *                   example: true
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: eabcb635-8127-4185-98cf-61d0328f011f
 *                       title:
 *                         type: string
 *                         example: 게시글 제목
 *                       content:
 *                         type: string
 *                         example: 게시글 내용
 *                       nickname:
 *                         type: string
 *                         example: 닉네임
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: 1651730614927docker.png
 *                       createdAt:
 *                         type: date
 *                         example: 2022-04-21T17:45:00.308Z
 */
postRouter.get("/posts", async (req, res, next) => {
  try {
    const list = await PostService.listPost();
    const body = {
      success: true,
      payload: list,
    };
    res.status(status.STATUS_200_OK).send(body);
  } catch (error) {
    next(error);
  }
});

/** GET /posts/:id swaggerdoc
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: 특정 post를 조회하는 API
 *     description: |
 *       ## 반환형식
 *       ```js
 *         {
 *         success: true,
 *         payload: {
 *        "id": "31aa8971-0954-47e5-9d37-92a8367ba283",
 *        "title": "제목테스트",
 *        "content": "내용 테스트",
 *        "nickname": "닉네임 테스트",
 *        "images": [
 *            "1651730176428docker.png",
 *            "1651730176429error.gif",
 *            "1651730176463rocket.png"
 *        ],
 *        "createdAt": "2022-05-05T05:56:16.494Z"
 *        }
 *       ```
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: 조회할 POST의 id
 *         example: 31aa8971-0954-47e5-9d37-92a8367ba283
 *         schema:
 *          type: string
 *     responses:
 *       "200":
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suceess:
 *                   type: boolean
 *                   description: 응답 여부
 *                   example: true
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: eabcb635-8127-4185-98cf-61d0328f011f
 *                     title:
 *                       type: string
 *                       example: 게시글 제목
 *                     content:
 *                       type: string
 *                       example: 게시글 내용
 *                     nickname:
 *                       type: string
 *                       example: 닉네임
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 1651730614927docker.png
 *                     createdAt:
 *                       type: date
 *                       example: 2022-04-21T17:45:00.308Z
 */
postRouter.get("/posts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PostService.findPost({ id });
    const body = {
      success: true,
      payload: post,
    };
    res.status(status.STATUS_200_OK).send(body);
  } catch (error) {
    next(error);
  }
});

export { postRouter };
