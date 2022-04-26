import { validationResult } from "express-validator";
import { STATUS_400_BADREQUEST, STATUS_404_NOTFOUND } from "../utils/status.js";
import { logger } from "../utils/winstonLogger.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  logger.error("유효성 검증에서 400 에러 발생");
  return res.status(STATUS_400_BADREQUEST).json({
    success: false,
    error: {
      code: STATUS_400_BADREQUEST,
      message: errors.array()[0].msg,
      detail: errors.errors,
    },
  });
};

const notFoundValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  logger.error("유효성 검증에서 404 에러 발생");
  return res.status(STATUS_404_NOTFOUND).json({
    success: false,
    error: {
      code: STATUS_404_NOTFOUND,
      message: errors.array()[0].msg,
      detail: errors.errors,
    },
  });
};

export { validate, notFoundValidate };
