import AccessManager from "./AccessManager"
import HttpClient from "./HttpClient"
import ErrorParser from "./ErrorParser"

export default {
  accessManager: ({ config }) => new AccessManager(config.accessManager),
  httpClient: ({ config }) => new HttpClient(config.httpClient),
  errorParser: () => new ErrorParser()
}
