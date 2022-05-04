import { logger } from "../utils/winstonLogger.js";
import { AppError, RequestError } from "../utils/errors.js";
import * as status from "../utils/status.js";

function errorMiddleware(error, req, res, next) {
  if (error instanceof RequestError) {
    res.status(error.status ?? status.STATUS_400_BADREQUEST).json({
      errorMessage: error.message,
      ...error.payload,
    });
    logger.info(`${error.name}: ${error.message}`);
  } else if (error instanceof AppError) {
    if (error.exit > 0) {
      process.exit(error.exit);
    }
    /** @todo 범용 에러(AppError, RequestError) 사용 */
  } else {
    res.status(status.STATUS_500_INTERNALSERVERERROR).json({
      errorMessage: error.message,
      success: false,
    });
    logger.warn(error.stack);
  }
}

export { errorMiddleware };
