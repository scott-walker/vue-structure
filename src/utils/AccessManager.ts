import LocalStorage from "./LocalStorage"

/**
 * Конфигурация менеджера доступа
 */
export interface AccessManagerConfig {
  /** Роли пользователя */
  roles: string[]
  /** Разрешения пользователя */
  permissions: string[]
  /** Ключ для хранения данных аутентификации в localStorage */
  authKey?: string
  /** Включить логирование */
  enableLogging?: boolean
}

/**
 * Данные аутентификации
 */
export interface AuthData {
  /** Роли пользователя */
  roles: string[]
  /** Разрешения пользователя */
  permissions: string[]
  /** Время истечения токена */
  expiresAt?: number
  /** Дополнительные данные пользователя */
  userData?: Record<string, unknown>
}

/**
 * Утилита. Управляющий доступом
 */
export default class AccessManager {
  private config: Required<AccessManagerConfig>
  private storage: LocalStorage

  /**
   * Инициализировать управляющего доступом
   * @param config конфигурация менеджера доступа
   */
  constructor(config: AccessManagerConfig) {
    this.config = {
      authKey: "auth_data",
      enableLogging: false,
      ...config
    }
    this.storage = new LocalStorage()
  }

  /**
   * Проверить, авторизован ли пользователь
   * @returns true если пользователь авторизован
   */
  isLogged(): boolean {
    try {
      const authData = this.storage.get(this.config.authKey) as AuthData | null

      if (!authData) {
        return false
      }

      // Проверка истечения токена
      if (authData.expiresAt && Date.now() > authData.expiresAt) {
        this.logout()
        return false
      }

      return true
    } catch (error) {
      if (this.config.enableLogging) {
        console.error("[AccessManager] Ошибка при проверке авторизации:", error)
      }
      return false
    }
  }

  /**
   * Получить данные аутентификации
   * @returns данные аутентификации или null
   */
  getAuthData(): AuthData | null {
    if (!this.isLogged()) {
      return null
    }

    return this.storage.get(this.config.authKey) as AuthData | null
  }

  /**
   * Установить данные аутентификации
   * @param authData данные аутентификации
   */
  setAuthData(authData: AuthData): void {
    this.storage.set(this.config.authKey, authData)
  }

  /**
   * Выйти из системы
   */
  logout(): void {
    this.storage.remove(this.config.authKey)
  }

  /**
   * Проверить, имеет ли пользователь определенную роль
   * @param role роль для проверки
   * @returns true если пользователь имеет роль
   */
  hasRole(role: string): boolean {
    const authData = this.getAuthData()
    return authData?.roles.includes(role) ?? false
  }

  /**
   * Проверить, имеет ли пользователь любое из разрешений
   * @param permissions разрешения для проверки
   * @returns true если пользователь имеет хотя бы одно разрешение
   */
  hasAnyPermission(permissions: string[]): boolean {
    const authData = this.getAuthData()
    if (!authData) return false

    return permissions.some(permission => authData.permissions.includes(permission))
  }

  /**
   * Проверить, имеет ли пользователь все разрешения
   * @param permissions разрешения для проверки
   * @returns true если пользователь имеет все разрешения
   */
  hasAllPermissions(permissions: string[]): boolean {
    const authData = this.getAuthData()
    if (!authData) return false

    return permissions.every(permission => authData.permissions.includes(permission))
  }

  /**
   * Получить все роли пользователя
   * @returns массив ролей
   */
  getRoles(): string[] {
    const authData = this.getAuthData()
    return authData?.roles ?? []
  }

  /**
   * Получить все разрешения пользователя
   * @returns массив разрешений
   */
  getPermissions(): string[] {
    const authData = this.getAuthData()
    return authData?.permissions ?? []
  }
}
