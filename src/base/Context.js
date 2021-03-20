/**
 * Контекст приложения
 */
export default class Context {
  /**
   * Инициализировать контекст
   * @param {Object} config конфигурация контекста
   * @param {Object} dependencies карта зависимостей контекста
   */
  constructor(config, dependencies) {
    this.config = config || {}
    this.dependencies = {}
    this.instances = {}

    if (dependencies) {
      this.setDependencies(dependencies)
    }
  }

  /**
   * Установить зависимости
   * @param {Object} dependencies карта зависимостей
   * @param {Boolean} force позволяется перезапись зависимости
   */
  setDependencies(dependencies, force = false) {
    for (const [address, dependency] of Object.entries(dependencies)) {
      this.set(address, dependency, force)
    }
  }

  /**
   * Установить зависимость
   * @param {String} address адрес зависимости
   * @param {*} dependency зависимость
   * @param {Boolean} force позволяется перезапись зависимости
   */
  set(address, dependency, force = false) {
    if (!force && this.dependencies[address]) {
      throw ""
    }

    this.dependencies[address] = dependency
  }

  /**
   * Получить область видимости
   * @return {Object} область видимости
   */
  getArea() {
    return {
      config: this.config,
      make: this.make.bind(this),
      invoke: this.invoke.bind(this)
    }
  }

  /**
   * Сделать новый экземпляр зависимости
   * @param {String} address адрес зависимости
   * @param {*} params параметры зависимости
   * @return {Object} экземпляр зависимости
   */
  make(address, params) {
    const dependency = this.dependencies[address]

    if (!dependency) {
      throw ""
    }

    if (dependency instanceof Function) {
      return dependency.call(null, params, this.getArea())
    }

    return dependency
  }

  /**
   * Вызвать экземпляр зависимости
   * @param {String} address адрес зависимости
   * @return {Object} экземпляр зависимости
   */
  invoke(address) {
    if (!this.instances[address]) {
      this.instances[address] = this.make(address)
    }

    return this.instances[address]
  }
}
