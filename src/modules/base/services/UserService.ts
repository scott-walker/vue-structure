import HttpClient from "@utils/HttpClient"
import Storage from "@/utils/LocalStorage"
import ErrorParser from "@utils/ErrorParser"

interface UserData {
  email: string
  token: string
}

/**
 * Сервис для работы с пользователем
 */
export default class UserService {
  private httpClient: HttpClient
  private storage: Storage
  private errorParser: ErrorParser

  /**
   * Инициализировать сервис
   * @param httpClient HTTP клиент
   * @param storage хранилище
   * @param errorParser парсер ошибок
   */
  constructor(httpClient: HttpClient, storage: Storage, errorParser: ErrorParser) {
    this.httpClient = httpClient
    this.storage = storage
    this.errorParser = errorParser
  }

  /**
   * Получить данные пользователя
   * @return данные пользователя
   */
  getUser(): UserData {
    return this.storage.get("user", {}) as UserData
  }

  /**
   * Логинеть пользователя
   * @param email email пользователя
   * @param password пароль пользователя
   * @return токен пользователя
   */
  async login(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new Error("Укажите логин и пароль")
    }

    try {
      const response = await this.httpClient.post<{ token: string }>("user/login", { email, password })
      const token = response.data.token

      this.storage.set("user", { email, token })

      return token
    } catch (error) {
      throw this.errorParser.parse(error)
    }
  }

  /**
   * Разлогинеть пользователя
   */
  async logout(): Promise<void> {
    try {
      await this.httpClient.post("user/logout")

      this.storage.remove("user")
    } catch (error) {
      throw this.errorParser.parse(error)
    }
  }
}
