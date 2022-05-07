import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path"; // 파일 경로 모듈
// import redis from "redis";
import { logger } from "./utils/winstonLogger.js";
import { characterRouter } from "./routers/characterRouter.js";
import { commentRouter } from "./routers/commentRouter.js";
import { scoreRouter } from "./routers/scoreRouter.js";
import { statRouter } from "./routers/statRouter.js";
import { csmRouter } from "./routers/csmRouter.js";
import { postRouter } from "./routers/postRouter.js";
import { guestbookRouter } from "./routers/guestbookRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import sriracha from "sriracha";
import "../src/loaders/index.js";

// 환경 변수 설정을 위한 dotenv 적용
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "../.env") });
const app = express();
// CORS 에러 방지
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: false }));
app.use("/admin", sriracha());

app.use(
  morgan(":method :status :url :response-time ms", { stream: logger.stream })
);

app.use(characterRouter);
app.use(commentRouter);
app.use(scoreRouter);
app.use(statRouter);
app.use(csmRouter);
app.use(postRouter);
app.use(guestbookRouter);

app.use(errorMiddleware);

export { app };
