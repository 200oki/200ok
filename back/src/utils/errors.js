import {
  STATUS_400_BADREQUEST,
  STATUS_500_INTERNALSERVERERROR,
} from "./status.js";

/** Request Error Class that blames (mostly) bad request kind.
 *
 * ## Constructor
 * @constructor
 * @param {{status: number, payload: any}} payload
 * @param {any[]} params
 * ```js
 *  {
 *      status: number = 400,
 *      payload: any = { success: false }
 *  }, ...params
 * ```
 *  - `status`: This is sent to errorMiddleware and then sent to the browser.
 *  - `payload` holds res data to send it even in the brink of erroring out.
 *  - `params`: Anything that you would otherwise pass to an Error.
 */
class RequestError extends Error {
  constructor(
    { status = STATUS_400_BADREQUEST, payload = { success: false } },
    ...params
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError);
    }

    this.name = this.constructor.name;
    this.status = status;
    this.payload = payload;
  }
}

/** 기본 `Error` 타입에 더 구체적인 정보를 담을 수 있도록 확장한 범용 에러입니다. */
class AppError extends Error {
  /** 더 구체적인 정보를 담을 수 있도록 확장한 범용 에러입니다.
   *
   * @arg {{
   *  name?: string,
   *  status?: number,
   *  exit?: number,
   *  detail?: any
   * }} kwargs - 일부는 생략 가능합니다. 전부 생략하려면 `{}`를 줍니다.
   *    - `name`: 기본값 `this.constructor.name` = `"AppError"`
   *    - `status`: http status code입니다. 기본값 `500 Internal Server Error`
   *    - `exit`: 0이 아니면 `exit`에 인자로 들어가 프로세스를 끝냅니다. 기본값 `0`
   *    - `detail`: 에러 분류를 돕기 위한 추가 정보입니다.
   * @arg {string} [message] - `Error` 컨스트럭터로 릴레이할 메시지입니다.
   * @arg {{cause: Error}} [options] - `{ cause?: Error }`
   * @arg {string} [fileName]
   * @arg {number} [lineNumber]
   */
  constructor({ name, status, exit, detail }, ...params) {
    super(...params);
    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.name = name ?? this.constructor.name;
    this.status = status ?? STATUS_500_INTERNALSERVERERROR;
    this.exit = exit ?? 0;
    this.detail = detail;
  }
}

export { RequestError, AppError };
