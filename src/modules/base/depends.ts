import UserService from "./services/UserService"

/**
 * Зависимости модуля
 */
export default ({ invoke }) => {
  const httpClient = invoke("@utils/HttpClient")
  const storage = invoke("@utils/Storage")
  const errorParser = invoke("@utils/ErrorParser")

  return {
    "@base/services/UserService": () => new UserService(httpClient, storage, errorParser)
  }
}
