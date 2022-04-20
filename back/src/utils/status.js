/** [HTTP response status codes]
 * (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
 */

/** The request succeeded.
 * The result meaning of "success" depends on the HTTP method:
 *
 * - `GET`: The resource has been fetched and transmitted in the message body.
 * - `HEAD`: The representation headers are included in the response without any message body.
 * - `PUT` or `POST`: The resource describing the result of the action is transmitted in the message body.
 * - `TRACE`: The message body contains the request message as received by the server.
 */
export const STATUS_200_OK = 200;

/** The request succeeded, and a new resource was created as a result.
 * This is typically the response sent after `POST` requests, or some `PUT`
 * requests.
 */
export const STATUS_201_CREATED = 201;

/** The server cannot or will not process the request due to something that is
 * perceived to be a client error (e.g., malformed request syntax, invalid
 * request message framing, or deceptive request routing).
 */
export const STATUS_400_BADREQUEST = 400;

/** The client must authenticate itself to get the requested response.
 * Although the HTTP standard specifies "unauthorized", semantically this
 * response means "unauthenticated".
 */
export const STATUS_401_UNAUTHORIZED = 401;

/** The client does not have access rights to the content;
 * that is, it is unauthorized, so the server is refusing to give the requested
 * resource.
 * Unlike `401 Unauthorized`, the client's identity is known to the server.
 */
export const STATUS_403_FORBIDDEN = 403;

/** The server can not find the requested resource.
 * In the browser, this means the URL is not recognized.
 * In an API, this can also mean that the endpoint is valid but the resource
 * itself does not exist.
 * Servers may also send this response instead of `403 Forbidden` to hide the
 * existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
 */
export const STATUS_404_NOTFOUND = 404;

/** The request method is known by the server but is not supported by the
 * target resource.
 * For example, an API may not allow calling `DELETE` to remove a resource.
 */
export const STATUS_405_METHODNOTALLOWED = 405;

/**The server has encountered a situation it does not know how to handle.
 */
export const STATUS_500_INTERNALSERVERERROR = 500;

/** The request method is not supported by the server and cannot be handled.
 * The only methods that servers are required to support (and therefore that
 * must not return this code) are `GET` and `HEAD`.
 */
export const STATUS_501_NOTIMPLEMENTED = 501;
