import { validationResult } from "express-validator";
import { STATUS_400_BADREQUEST, STATUS_404_NOTFOUND } from "../utils/status.js";
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
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
  return res.status(404).json({
    success: false,
    error: {
      code: STATUS_404_NOTFOUND,
      message: errors.array()[0].msg,
      detail: errors.errors,
    },
  });
};

export { validate, notFoundValidate };
