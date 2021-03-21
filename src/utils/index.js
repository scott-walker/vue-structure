import AccessManager from "./AccessManager"
import HttpClient from "./HttpClient"
import ErrorParser from "./ErrorParser"

/**
 * Зависимости приложения
 */
export default ({ config }) => {
  return {
    accessManager: () => new AccessManager(config.accessManager),
    httpClient: () => new HttpClient(config.httpClient),
    errorParser: () => new ErrorParser()
  }
}
