import dotenv from "dotenv";
import mongoose from "mongoose";
// import redis from "redis";

import { logger } from "../utils/winstonLogger.js";

// 환경 변수 가져오기
dotenv.config();

// .env를 검사합니다.
["SERVER_PORT", "MONGODB_URL", "NODE_ENV", "IMAGE_DIR"].forEach((envVar) => {
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
  if (err instanceof Error) {
    logger.error(`\n\nTHE END OF TIME IS NIGH BECAUSE OF AN ${origin}\n`);
    logger.error(err.stack);
  }
  if (message && logas in logger) {
    logger[logas](message);
  }
  mongoConnection.close(true);
  // redisClient.quit();
  /** 이 부분은 의도한 대로 작동하지 않을 가능성이 있습니다.
   *
   * @fixme node 공식 문서에 따르면, process.exit을 직접 사용하는 건 동기적이고
   * log 등은 비동기적이기 때문에 로그를 마치지 못하고 프로세스가 끝날 수 있습니다.
   * 따라서 만일 로그 손실이 일어난다면 process.exit(1)을 지우는 방법을 강구해봐야
   * 할 것 같습니다.
   * 사실 하지 말라는 짓 예제에 정확히 지금 우리가 하고 있는 이게 나옵니다 ㅜㅜ
   */
  process.exit(1);
};

process.on("uncaughtException", coupDeGrace.bind(null, {}));
process.on("SIGBREAK", coupDeGrace.bind(null, { message: "(SIGBREAK) BYE" }));
process.on("SIGTERM", coupDeGrace.bind(null, { message: "(SIGTERM) BYE" }));
process.on("SIGINT", coupDeGrace.bind(null, { message: "(SIGINT) BYE" }));

export { mongoConnection };
