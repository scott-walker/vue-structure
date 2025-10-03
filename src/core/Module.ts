import type { IModule, RouterRoute, SharedApi, ModuleProps, SharedContext, StoredApi } from "@types"
import { ModuleError } from "./ModuleError"

/**
 * Модуль приложения
 * @param id ID модуля
 * @param inirRoutes Инициализатор маршрутов модуля
 * @param initStored Инициализатор хранилища состояний модуля
 * @param initShared Инициализатор API модуля (общедоступный API)
 */
export class Module implements IModule {
  public id: string
  public inirRoutes?: (context: SharedContext) => RouterRoute[]
  public initStored?: (context: SharedContext) => StoredApi
  public initShared?: (context: SharedContext) => SharedApi

  /**
   * Инициализировать модуль
   */
  constructor({ id, inirRoutes, initStored, initShared }: ModuleProps) {
    if (!id) {
      throw new ModuleError("Module ID is required")
    }

    this.id = id
    this.inirRoutes = inirRoutes
    this.initStored = initStored
    this.initShared = initShared
  }
}
