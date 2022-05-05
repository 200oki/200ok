import dotenv from "dotenv";
import mongoose from "mongoose";
// import redis from "redis";

import { logger } from "../utils/winstonLogger.js";

process.on("uncaughtException", (err, origin) => {
  logger.error(`\n\n${origin.toUpperCase()}: THE END OF TIME IS NIGH\n`);
  logger.error(err.stack);
  process.exit(1);
});

// 환경 변수 가져오기
dotenv.config();

// .env를 검사합니다.
["SERVER_PORT", "MONGODB_URL", "NODE_ENV"].forEach((envVar) => {
  if (!(envVar in process.env)) {
    throw new Error(`OUR STUPID ADMIN FORGOT TO ADD "${envVar}" IN THE ENV`);
  }
});

// mongoose 설정
const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const mongoConnection = mongoose.connection;

mongoConnection.on("connected", () =>
  // console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.")
);

mongoConnection.on("error", (error) =>
  // console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
  console.error("MongoDB 연결에 실패하였습니다...\n" + "\n" + error)
);

// // redis 설정
// const REDIS_PORT = process.env.REDIS_PORT;
// const redisClient = redis.createClient(REDIS_PORT);
// redisClient.connect();

export { mongoConnection };
