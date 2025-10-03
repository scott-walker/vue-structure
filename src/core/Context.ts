import type {
  IContext,
  ModuleId,
  Router,
  StoredApi,
  SharedApi,
  SharedMap,
  StoredMap,
  ContextProps,
  Config
} from "@types"
import { ContextError } from "./ContextError"

export class Context implements IContext {
  public config: Config
  public router: Router | null
  public stored: StoredMap
  public shared: SharedMap

  /**
   * Инициализировать контекст
   * @param config Конфигурация
   * @param router Маршрутизатор
   * @param stored Карта модулей хранилища состояний
   * @param shared Карта модулей общедоступных API
   */
  constructor({ config, router, stored, shared }: ContextProps = {}) {
    this.config = {}
    this.router = null
    this.stored = new Map()
    this.shared = new Map()

    if (config) this.setConfig(config)
    if (router) this.setRouter(router)
    if (stored) {
      Object.entries(stored).forEach(([id, stored]) => this.setStored(id, stored))
    }
    if (shared) {
      Object.entries(shared).forEach(([id, shared]) => this.setShared(id, shared))
    }
  }

  /**
   * Установить конфигурацию
   * @param config Конфигурация
   */
  public setConfig(config: Config): void {
    this.config = config
  }

  /**
   * Установить маршрутизатор
   * @param router Маршрутизатор
   */
  public setRouter(router: Router): void {
    this.router = router
  }

  /**
   * Установить модуль хранилища состояний
   * @param id ID модуля
   * @param stored Модуль хранилища состояний
   */
  public setStored(id: ModuleId, stored: StoredApi): void {
    this.stored.set(id, stored)
  }

  /**
   * Установить модуль общедоступного API
   * @param id ID модуля
   * @param shared Модуль общедоступного API
   */
  public setShared(id: ModuleId, shared: SharedApi): void {
    this.shared.set(id, shared)
  }

  /**
   * Использовать маршрутизатор
   */
  public useRouter(): Router {
    if (!this.router) {
      throw new ContextError("Router not installed")
    }

    return this.router
  }

  /**
   * Использовать модуль хранилища состояний
   * @param id ID модуля
   */
  public useStored<T = StoredApi>(id: ModuleId): T {
    const store = this.stored.get(id)

    if (!store) {
      throw new ContextError(`Stored API for module ${id} not found`)
    }

    return store as T
  }

  /**
   * Использовать модуль общедоступного API
   * @param id ID модуля
   */
  public useShared<T = SharedApi>(id: ModuleId): T {
    const shared = this.shared.get(id)

    if (!shared) {
      throw new ContextError(`Shared API for module ${id} not found`)
    }

    return shared as T
  }
}
