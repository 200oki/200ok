import { STATUS_400_BADREQUEST } from "./status";

/** Request Error Class that blames (mostly) bad request kind.
 *
 * ## Constructor
 * @constructor
 * @param {{status: number, payload: any}} payload
 * @param {any[]} params
 * ```js
 *  {
 *      status: number = 400,
 *      payload: any = { result: false }
 *  }, ...params
 * ```
 *  - `status`: This is sent to errorMiddleware and then sent to the browser.
 *  - `payload` holds res data to send it even in the brink of erroring out.
 *  - `params`: Anything that you would otherwise pass to an Error.
 */
class RequestError extends Error {
    constructor(
        { status = STATUS_400_BADREQUEST, payload = { result: false } },
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

export { RequestError };
