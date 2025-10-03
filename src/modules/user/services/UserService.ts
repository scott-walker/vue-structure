import type { IHttpClient, ILocalStorage } from "@types"

/**
 * DTO пользователя
 */
export interface UserDto {
  email: string
  token: string
}

/**
 * Ошибка сервиса для работы с пользователем
 */
class UserServiceError extends Error {
  public name: string = "UserServiceError"
  constructor(message: string) {
    super(message)
  }
}

/**
 * Сервис для работы с пользователем
 */
export class UserService {
  private httpClient: IHttpClient
  private localStorage: ILocalStorage

  /**
   * Инициализировать сервис
   * @param httpClient HTTP клиент
   * @param localStorag e хранилище
   */
  constructor(httpClient: IHttpClient, localStorage: ILocalStorage) {
    this.httpClient = httpClient
    this.localStorage = localStorage
  }

  /**
   * Получить данные пользователя
   * @return данные пользователя
   */
  getUser(): UserDto {
    return this.localStorage.get("user", {}) as UserDto
  }

  /**
   * Логинеть пользователя
   * @param email email пользователя
   * @param password пароль пользователя
   * @return токен пользователя
   */
  async login(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new UserServiceError("Укажите логин и пароль")
    }

    try {
      const response = await this.httpClient.post<{ token: string }>("user/login", { email, password })
      const token = response.data.token

      this.localStorage.set("user", { email, token })

      return token
    } catch (error) {
      throw new UserServiceError((error as Error).message)
    }
  }

  /**
   * Разлогинеть пользователя
   */
  async logout(): Promise<void> {
    try {
      await this.httpClient.post("user/logout")

      this.localStorage.remove("user")
    } catch (error) {
      throw new UserServiceError((error as Error).message)
    }
  }
}
