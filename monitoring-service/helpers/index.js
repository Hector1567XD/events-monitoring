/**
 * @param {string} message The message to parse.
 * @return The parsed JSON object or null.
 */

export function safeParseJSON(message) {
  try {
    return JSON.parse(message)
  } catch (error) {
    return null
  }
}

/* Basado en:
 * https://github.com/itsUnsmart/express-ws-boiler/blob/master/helpers/index.js
 */
