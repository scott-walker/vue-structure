/**
 * Сервис для работы с пользователем
 */
export default class UserService {
  /**
   * Инициализировать сервис
   * @param {Object} httpClient
   * @param {Object} storage
   * @param {Object} errorParser
   */
  constructor(httpClient, storage, errorParser) {
    this.httpClient = httpClient
    this.storage = storage
    this.errorParser = errorParser
  }

  /**
   * Получить данные пользваотеля
   * @return {Object}
   */
  getUser() {
    return this.storage.get("user", {})
  }

  /**
   * Логинеть пользователя
   * @param {String} email
   * @param {String} password
   * @return {Promise<String>}
   */
  async login(email, password) {
    if (!email || !password) {
      throw "Укажите логин и пароль"
    }

    try {
      const token = await this.httpClient.post("user/login", { email, password })

      this.storage.set("user", { email, token })

      return token
    } catch (error) {
      throw this.errorParser.parse(error)
    }
  }

  /**
   * Разлогинеть пользователя
   */
  async logout() {
    try {
      await this.httpClient.post("user/logout")

      this.storage.remove("user")
    } catch (error) {
      throw this.errorParser.parse(error)
    }
  }
}
