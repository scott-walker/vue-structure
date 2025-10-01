import { createPinia, type Pinia, defineStore } from "pinia"
import { type StoreModule, type Store } from "@types"

/**
 * Менеджер Store
 */
export default class StoreManager {
  private pinia: Pinia
  private stores: Map<string, Store> = new Map()

  constructor() {
    this.pinia = createPinia()
  }

  /**
   * Получить экземпляр Pinia
   */
  public getPinia(): Pinia {
    return this.pinia
  }

  /**
   * Зарегистрировать модули хранилища
   * @param modules модули хранилища
   */
  public registerModules(modules: StoreModule): void {
    for (const [moduleName, storeConfig] of Object.entries(modules)) {
      this.registerStore(moduleName, storeConfig)
    }
  }

  /**
   * Зарегистрировать отдельный store
   * @param name имя store
   * @param storeConfig конфигурация store
   */
  private registerStore(name: string, storeConfig: Store): void {
    // Создаем store с помощью defineStore
    defineStore(storeConfig.id, {
      state: storeConfig.state,
      getters: storeConfig.getters || {},
      actions: storeConfig.actions || {}
    })

    this.stores.set(name, storeConfig)
  }

  /**
   * Получить store по имени
   * @param name имя store
   */
  public getStore(name: string): Store | undefined {
    return this.stores.get(name)
  }

  /**
   * Получить все зарегистрированные stores
   */
  public getAllStores(): Map<string, Store> {
    return this.stores
  }
}
