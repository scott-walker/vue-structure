/**
 * Модуль приложения
 */
export default class Module {
  /**
   * Инициализировать модуль
   * @param {String} id
   * @param {Object} assets
   */
  constructor(id, { routes, store, dependencies }) {
    if (!id) {
      throw "Необходимо передать ID модуля приложения"
    }

    this.id = id
    this.routes = routes || null
    this.store = store || null
    this.dependencies = dependencies || null
  }

  /**
   * Получить ресурсы модуля
   */
  getAssets() {
    return {
      routes: this.routes,
      store: this.store,
      dependencies: this.dependencies
    }
  }
}
