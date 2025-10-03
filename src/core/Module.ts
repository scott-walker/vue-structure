import type {
  IModule,
  ModuleProps,
  ModuleInitRoutes,
  ModuleInitStored,
  ModuleInitShared,
  SharedApi,
  StoredApi
} from "@types"
import { ModuleError } from "./ModuleError"

/**
 * Модуль приложения
 * @param id ID модуля
 * @param inirRoutes Инициализатор маршрутов модуля
 * @param initStored Инициализатор хранилища состояний модуля
 * @param initShared Инициализатор API модуля (общедоступный API)
 */
export class Module<ST = StoredApi, SH = SharedApi> implements IModule<ST, SH> {
  public id: string
  public inirRoutes?: ModuleInitRoutes
  public initStored?: ModuleInitStored<ST>
  public initShared?: ModuleInitShared<SH>

  /**
   * Инициализировать модуль
   */
  constructor({ id, inirRoutes, initStored, initShared }: ModuleProps<ST, SH>) {
    if (!id) {
      throw new ModuleError("Module ID is required")
    }

    this.id = id
    this.inirRoutes = inirRoutes
    this.initStored = initStored
    this.initShared = initShared
  }
}
