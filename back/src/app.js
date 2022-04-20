import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path"; // 파일 경로 모듈
import { logger } from "./utils/winstonLogger.js";

// 환경 변수 설정을 위한 dotenv 적용
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "../.env") });
const app = express();

// CORS 에러 방지
app.use(cors());
// Logging 을 위한 morgan

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev", { stream: logger.stream })); // morgan 로그 설정
// 기본 페이지
app.get("/", (req, res, next) => {
  // logger.info("test");
  res.status(200).send({
    message: "test!",
  });
});

app.get("/test", (req, res, next) => {
  logger.error("error 발생");
  res.status(404).send({
    message: "error!",
  });
});

export { app };
