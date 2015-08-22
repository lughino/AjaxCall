/**
 * di logger
 *
 * @module di logger
 *
 * @author Luca Pau <luca.pau82@gmail.com>
 */


console.debug = console.trace;
console.fatal = console.error;
let _log = console;

export default {
  getLogger: () => _log,
  setLogger: (log) => _log = log,
  trace: (message) => _log.trace(message),
  info: (message) => _log.info(message),
  debug: (message) => _log.debug(message),
  error: (message) => _log.error(message),
  fatal: (message) => _log.fatal(message)
}