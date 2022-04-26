import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path"; // 파일 경로 모듈
import { logger } from "./utils/winstonLogger.js";
import { characterRouter } from "./routers/characterRouter.js";
import { commentRouter } from "./routers/commentRouter.js";
import { scoreRouter } from "./routers/scoreRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// 환경 변수 설정을 위한 dotenv 적용
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "../.env") });
const app = express();
// CORS 에러 방지
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  morgan(":method :status :url :response-time ms", { stream: logger.stream })
);

app.use(characterRouter);
app.use(commentRouter);
app.use(scoreRouter);

app.use(errorMiddleware);

// .env를 검사합니다.
["SERVER_PORT", "MONGODB_URL", "JWT_SECRET_KEY", "NODE_ENV"].forEach((k) => {
  if (!(k in process.env)) {
    throw new Error(`OUR STUPID ADMIN FORGOT TO ADD "${k}" IN THE ENV`);
  }
});

export { app };
