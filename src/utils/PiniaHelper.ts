import { type StoreModule } from "@types"

/**
 * Утилита для работы с Store stores
 */
export class StoreHelper {
  /**
   * Создать store модуль из конфигурации
   * @param id идентификатор store
   * @param config конфигурация store
   */
  public static createStoreModule(
    id: string,
    config: {
      state?: () => Record<string, unknown>
      getters?: Record<string, (state: Record<string, unknown>) => unknown>
      actions?: Record<string, (...args: unknown[]) => unknown>
    }
  ): StoreModule {
    return {
      [id]: {
        id,
        state: config.state || (() => ({})),
        getters: config.getters || {},
        actions: config.actions || {}
      }
    }
  }

  /**
   * Объединить несколько store модулей
   * @param modules массив store модулей
   */
  public static mergeStoreModules(...modules: StoreModule[]): StoreModule {
    return modules.reduce((acc, module) => ({ ...acc, ...module }), {})
  }

  /**
   * Создать store с типизированным состоянием
   * @param id идентификатор store
   * @param initialState начальное состояние
   */
  public static createTypedStore<T extends Record<string, unknown>>(id: string, initialState: T): StoreModule {
    return {
      [id]: {
        id,
        state: () => initialState,
        getters: {},
        actions: {}
      }
    }
  }
}

export default StoreHelper
