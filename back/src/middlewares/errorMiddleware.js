import { logger } from "../utils/winstonLogger.js";
import { RequestError } from "../utils/errors.js";
import * as status from "../utils/status.js";

function errorMiddleware(error, req, res, next) {
  if (error instanceof RequestError) {
    res.status(error.status ?? status.STATUS_400_BADREQUEST).json({
      errorMessage: error.message,
      ...error.payload,
    });
    logger.info(`${error.name}: ${error.message}`);
  } else {
    res.status(status.STATUS_500_INTERNALSERVERERROR).json({
      errorMessage: error.message,
      success: false,
    });
    logger.warn(error.stack);
  }
}

export { errorMiddleware };
