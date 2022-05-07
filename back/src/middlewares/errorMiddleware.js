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
    if (error.logas in logger) {
      logger[error.logas](error.stack, error.detail);
    }
    res.status(error.status).json({
      success: false,
      // 이 부분은 합의가 필요하고 프로젝트마다 달라집니다.
      detail: {
        status: error.status,
        message: error.message,
        operational: error.exit === 0,
      },
    });
    if (!error.operational) {
      process.exit(1);
    }
  } else {
    res.status(status.STATUS_500_INTERNALSERVERERROR).json({
      errorMessage: error.message,
      success: false,
    });
    logger.warn(error.stack);
  }
}

export { errorMiddleware };
