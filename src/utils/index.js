import AccessManager from "./AccessManager"
import HttpClient from "./HttpClient"
import ErrorParser from "./ErrorParser"
import Storage from "./Storage"

/**
 * Зависимости приложения
 */
export default ({ config }) => {
  return {
    "@utils/AccessManager": () => new AccessManager(config.accessManager),
    "@utils/HttpClient": () => new HttpClient(config.httpClient),
    "@utils/ErrorParser": () => new ErrorParser(),
    "@utils/Storage": () => new Storage()
  }
}
