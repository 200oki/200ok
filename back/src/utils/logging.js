import * as dotenv from "dotenv";
dotenv.config();

import * as fs from "fs";
import * as util from "util";
import * as path from "path";
// import * as fsp from "fs/promises";
// import { Writable } from "stream";

/**
 * @typedef {string|number} filelike
 *  - Either string representing a writable file path or open file descriptor.
 */

// const { W_OK } = fs.constants;
// const { O_APPEND, O_SYNC } = fs.constants;
// const { S_IRWXU, S_IRWXG } = fs.constants;

/** @const {string} LOGDIR - Path where log files reside: `/back/logs`. */
const LOGDIR = path.resolve(`${__dirname}`, "..", "..", "logs");

/** @const {string} UNIFIED_LOG - Default log path: `/back/logs/unified.log` */
const UNIFIED_LOG = path.resolve(LOGDIR, "unified.log");

/** Output logs to multiple streams, depending on debug level.
 *  - `env.DEBUG` affects which message appear on the logs.
 *  - `env.LOG_MODE` decides in which mode the logs are writen ('w' or 'a').
 *    Default is 'a'.
 *
 * ## Constructor
 * @constructor
 * @param {{
 *      name: string,
 *      tee: filelike[],
 *      tee_ignore_level: boolean,
 *      debug_override: number,
 *      default_level: number
 * }} option
 *  ```js
 *  {
 *      name: string = "",
 *      tee: filelike[] = [],
 *      tee_ignore_level: boolean = false,
 *      debug_override: number = null,
 *      default_level: number = null
 *  }
 *  ```
 *  - `name` will help identify which logger wrote it in your log.
 *  - `tee` is an iterable of either file paths or open file descriptors.
 *    Mixing them is fine.
 *  - `tee_ignore_level` if `true`, all tee streams (that are not `stdout`)
 *    will be written, ignoring `env.DEBUG`'s value.
 *  - `debug_override`, if set, overrides `DEBUG` set in the env.
 *
 * ## Methods
 * @method static generateLogPath(filename)
 *  - Generate log file path under `LOGDIR`.
 * @method static resolvePaths(...paths)
 *  - Convenience path joining tool so that you don't need to.
 * @method log({ __level__ = this.default_level }, ...msgs)
 *  - Log messages. Output may or may not appear on stdout depending on env.
 *
 * ## Properties
 * @prop {number} debug
 *  - Stored value of `process.env.DEBUG`; Defaults to 0.
 * @prop {string} mode
 *  - Stored value of `process.env.LOG_MODE`; Defaults to 'a'.
 * @prop {number} stdout
 *  - This is equal to `process.stdout.fd`.
 * @prop {string} name
 *  - This logger's name. Try to give it a reasonably descriptive one.
 * @prop {number} defaultLevel
 *  - Default level of all incoming messages without specifying `__level__`.
 *    `defaultLevel` itself defaults to 3.
 * @prop {number[]} tee
 *  - Stored streams as file descriptors.
 * @prop {boolean} tee_ignore_level
 *  - If `true`, all tee streams (that are not `stdout`)
 *    will be written, ignoring `env.DEBUG`'s value.
 */
class Logger {
  /** Track init done state.
   * @private {{filename: boolean}}
   * - Track initmessages so that even if multiple loggers write to the same
   *   file, only one init message gets to written.
   */
  static #_initDone = {};

  stdout = process.stdout.fd;
  debug = process.env.DEBUG ? Number(process.env.DEBUG) : 0;
  mode = "a";
  default_level = 3;

  tee = [];
  #_tee = [];
  tee_ignore_level = false;

  constructor({
    name = null,
    tee = [],
    tee_ignore_level = false,
    debug_override = null,
    default_level = null,
  }) {
    this.name = name ?? "I AM TOO LAZY TO NAME MY LOGGER";
    this.tee = tee;
    this.tee_ignore_level = tee_ignore_level;
    if (default_level) {
      this.default_level = default_level;
    }

    if (debug_override) {
      this.debug = debug_override;
    }
    if (this.debug > 0 && ["a", "w"].includes(process.env.LOG_MODE)) {
      this.mode = process.env.LOG_MODE;
    }

    for (const filelike of tee) {
      let fd = filelike;

      if (typeof filelike === "string") {
        try {
          if (!fs.existsSync(filelike)) {
            fs.mkdirSync(path.dirname(filelike), {
              recursive: true,
            });
          }

          // Open file as append/sync, with group rwx permission.
          fd = fs.openSync(filelike, this.mode);
        } catch (error) {
          console.log(
            `${this.name} > Can't open file "${filelike}" for writing`
          );
          console.log(error);
          continue;
        }
      }

      this.#_tee.push(fd);
      if (!(filelike in Logger.#_initDone)) {
        Logger.#_initDone[filelike] = false;
      }
    }

    this.#_init();
  }

  /** Generate log file path under `LOGDIR`.
   *
   * @param {string} filename
   *  - Log file name, better have `.log` extension for consistency.
   * @returns {string} resolvedPath
   *  - The joined and resolved absolute path to your log file.
   */
  static generateLogPath(filename) {
    return path.resolve(LOGDIR, filename);
  }

  /** Handy path joining tool so that you don't need to.
   *
   * @param {string[]} paths
   *  - Iterable of strings representing paths. Usually you will want
   *    something like: `Logger.resolvePaths(Logger.LOGDIR, "mylogfile.log")`
   * @returns {string} resolvedPath
   *  - The joined and resolved absolute path to your log file.
   */
  static resolvePaths(...paths) {
    return path.resolve(...paths);
  }

  /** Log messages. Output may or may not appear on stdout depending on env.
   *
   * @param {{__level__: number}} options
   *  ```js
   *  { __level__: number = this.default_level }
   * ```
   *  - `__level__` specifies the level of a message. A message will be
   *    written to streams only if its `__level__` is less than or equal to
   *    current `process.env.DEBUG` value.
   *  - Defaults to 3. **If you want to omit it, pass `{}` instead.**
   */
  log({ __level__ = this.default_level }, ...msgs) {
    const date = new Date();
    const msg =
      msgs
        .map((m) => {
          const s = util.inspect(m);
          return typeof m === "string" ? s.slice(1, s.length - 1) : s;
        })
        .join(" ") + "\n";
    const consoleMsg = `${this.name}$ ${msg}`;
    const fileMsg =
      `${this.name} @ ` +
      `${date.toISOString().slice(2, 10)} / ` +
      `${date.toTimeString().slice(0, 8)} $\n${msg}\n`;

    // Write to the console. Will always follow rules.
    if (__level__ <= this.debug) {
      fs.writeSync(this.stdout, consoleMsg, "utf-8");
    }

    if (this.tee_ignore_level || __level__ <= this.debug) {
      this.#_tee.forEach((fd) => fs.writeSync(fd, fileMsg, "utf-8"));
    }
  }

  /** Write distiniguishable lines in the log files. */
  #_init() {
    const now = Date();
    const padding = " ".repeat(parseInt((79 - now.length) / 2));
    const msg = `\n\n${"=".repeat(79)}\n${padding}${now}\n${"=".repeat(
      79
    )}\n\n`;

    this.#_tee.forEach((fd, idx) => {
      let filelike = this.tee[idx];
      if (!Logger.#_initDone[filelike]) {
        fs.writeSync(fd, msg, "utf-8");
        Logger.#_initDone[filelike] = true;
      }
    });
  }
}

// Quick test code!
/* const logger = new Logger({
    name: "myFirstLogger",
    tee: [UNIFIED_LOG, Logger.resolvePaths(LOGDIR, "mylogtest.log")],
});
// Test some basic object types.
logger.log({}, "I feel fine!");
logger.log({}, `LOGDIR is ${LOGDIR}`);
logger.log(
    { __level__: 1 },
    { ham: "jam", spam: "eggs", Camelot: "A silly place" }
);
logger.log({}, new Error("Something did not went wrong")); */

export { Logger, LOGDIR, UNIFIED_LOG };
