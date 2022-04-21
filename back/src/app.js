import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path"; // 파일 경로 모듈
import { logger } from "./utils/winstonLogger.js";
import { scoreRouter } from "./routers/scoreRouter.js";

// 환경 변수 설정을 위한 dotenv 적용
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
// CORS 에러 방지
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev", { stream: logger.stream })); // morgan 로그 설정

app.use(scoreRouter);

// 기본 페이지
// app.get("/", (req, res, next) => {
//   // logger.info("test");
//   res.status(200).send({
//     message: "test!",
//   });
// });

// app.get("/test", (req, res, next) => {
//   logger.error("error 발생");
//   res.status(404).send({
//     message: "error!",
//   });
// });

export { app };