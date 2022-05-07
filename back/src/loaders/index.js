import dotenv from "dotenv";
import mongoose from "mongoose";
// import redis from "redis";

import { logger } from "../utils/winstonLogger.js";

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

/** 서버 셧다운 이벤트 핸들러입니다. `bind` 메소드로 옵션을 넣어줍니다.
 *
 * @arg {{
 *    message: string,
 *    logas: string
 * }} options - 옵션 넣는 곳; 추가될 수 있습니다.
 *    - `message`: `logas` 메소드로 메시지를 출력합니다.
 *    - `logas`: `logger`에서 사용할 메소드 이름입니다. 기본값 `"info"`
 */
const coupDeGrace = ({ message, logas = "info" }, err, origin) => {
  if (err) {
    logger.error(
      `\n\nTHE END OF TIME IS NIGH BECAUSE OF AN ${origin.toUpperCase()}\n`
    );
    logger.error(err.stack);
  }
  if (message && logas in logger) {
    logger[logas](message);
  }
  mongoConnection.close(true);
  // redisClient.quit();
  process.exit(1);
};

process.on("uncaughtException", coupDeGrace.bind({}));
process.on("SIGBREAK", coupDeGrace.bind({ message: "SIGBREAK: BYE" }));
process.on("SIGTERM", coupDeGrace.bind({ message: "SIGTERM: BYE" }));
process.on("SIGINT", coupDeGrace.bind({ message: "SIGINT: BYE" }));

export { mongoConnection };
