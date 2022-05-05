import { logger } from "../utils/winstonLogger.js";
import { RequestError } from "../utils/errors.js";
import * as status from "../utils/status.js";

function errorMiddleware(error, req, res, next) {
  // console.log("\x1b[33m%s\x1b[0m", error);
  // logger.log({ __level__: 1 }, error);
  logger.error(error);

  // res.status(400).send(error.message);
  if (error instanceof RequestError) {
    res.status(error.status ?? status.STATUS_400_BADREQUEST).json({
      errorMessage: error.message,
      // payload: error.payload,
      ...error.payload,
    });
  } else {
    res.status(status.STATUS_500_INTERNALSERVERERROR).json({
      errorMessage: error.message,
      result: false,
    });
  }
}

export { errorMiddleware };
