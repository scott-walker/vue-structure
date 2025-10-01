import { type ModuleAssets } from "@types"

/**
 * Модуль приложения
 */
export default class Module {
  // ID модуля
  public id: string
  // Ресурсы модуля
  private assets: ModuleAssets

  /**
   * Инициализировать модуль
   * @param id
   * @param assets
   */
  constructor(id: string, assets: ModuleAssets) {
    if (!id) {
      throw "Необходимо передать ID модуля приложения"
    }

    this.id = id
    this.assets = assets
  }

  /**
   * Получить ресурсы модуля
   * @return
   */
  public getAssets(): ModuleAssets {
    return this.assets
  }

  /**
   * Установить ресурсы модуля
   * @param assets ресурсы модуля
   */
  public setAssets(assets: ModuleAssets): void {
    this.assets = assets
  }
}
