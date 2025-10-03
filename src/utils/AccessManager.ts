import type { IAccessManager, AccessManagerConfig, ILocalStorage, AccessManagerState } from "@types"

/**
 * Утилита. Управляющий доступом
 */
export class AccessManager implements IAccessManager {
  private config: AccessManagerConfig
  private storage: ILocalStorage
  private state: AccessManagerState = {
    token: null,
    expiresAt: 0,
    name: ""
  }

  /**
   * Инициализировать управляющего доступом
   * @param config конфигурация менеджера доступа
   */
  constructor(localStorage: ILocalStorage, config?: Partial<AccessManagerConfig>) {
    this.storage = localStorage
    this.config = {
      authKey: config?.authKey || "auth"
    }
    this.initState()
  }

  /**
   * Инициализировать состояние
   */
  private initState(): void {
    const state = this.storage.get(this.config.authKey) as AccessManagerState | null

    if (!state) return

    this.state = {
      token: state.token,
      name: state.name,
      expiresAt: state.expiresAt
    }
  }

  /**
   * Проверить, истекло ли время токена
   */
  public isExpired(): boolean {
    return !!this.state.expiresAt && Date.now() > this.state.expiresAt
  }

  /**
   * Проверить, авторизован ли пользователь
   */
  public isLogged(): boolean {
    return !!this.state.token || !this.isExpired()
  }
}
