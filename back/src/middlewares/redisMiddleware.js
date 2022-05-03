import redis from "redis";
import { STATUS_200_OK, STATUS_400_BADREQUEST } from "../utils/status.js";
import { logger } from "../utils/winstonLogger.js";
const redisPort = 6379;
const client = redis.createClient(redisPort);
client.connect();

async function checkCache(req, res, next) {
  try {
    const data = await client.get(req.url);
    if (data != null) {
      const dataObject = JSON.parse(data);
      const body = {
        success: true,
        payload: dataObject,
      };
      return res.status(STATUS_200_OK).json(body);
    } else {
      next();
    }
  } catch (error) {
    error.status = STATUS_400_BADREQUEST;
    logger.warn("Redis Error");
    next(error);
  }
}
export { client, checkCache };

// await client.set("/comments", JSON.stringify(list));
// const data = await client.get("/comments");
// const dataList = JSON.parse(data);
