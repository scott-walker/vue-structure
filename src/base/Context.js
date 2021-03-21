/**
 * Контекст приложения
 */
export default class Context {
  /**
   * Инициализировать контекст
   * @param {Object} config конфигурация контекста
   * @param {Object} assets ресурсы контекста
   */
  constructor(config, assets) {
    this.config = config || {}
    this.routes = []
    this.store = { modules: {} }
    this.dependencies = {}
    this.plugins = []
    this.instances = {}

    // Расширить ресурсы контекста
    this.extend(assets || {})
  }

  /**
   * Установить зависимость
   * @param {String} address адрес зависимости
   * @param {*} dependency зависимость
   * @param {Boolean} force позволяется перезапись зависимости
   */
  set(address, dependency, force = false) {
    // Если отключена форсированная перезапись и зависимость с заданным адресом уже существует
    if (!force && this.dependencies[address]) {
      throw `Зависимость с адресом "${address}" уже существует`
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
   * Получить ресурсы контекста
   * @return {Object}
   */
  getAssets() {
    return {
      routes: this.routes,
      store: this.store,
      dependencies: this.dependencies,
      plugins: this.plugins
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
      throw `Зависимость по адресу "${address}" не существует`
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

  /**
   * Расширить контекст
   * @param {Object} assets
   */
  extend({ routes, store, dependencies, plugins }) {
    // Если переданы маршруты
    if (routes) {
      // Расширить коллекцию маршрутов
      this.extendRoutes(routes)
    }

    // Если передано хранилище состояний
    if (store) {
      //  Расширить хранилище состояний
      this.extendStore(store)
    }

    // Если переданы зависимости
    if (dependencies) {
      // Расширить зависимости контекста
      this.extendDependencies(dependencies)
    }

    // Если переданы плагины
    if (plugins) {
      // Расширить коллекцию плагинов контекста
      this.extendPlugins(plugins)
    }
  }

  /**
   * Расширить коллекцию маршрутов контекста
   * @param {Array|Function} routes маршруты
   */
  extendRoutes(routes) {
    routes = routes instanceof Function ? routes.call(null, this.getArea()) : routes

    // Если маршруты получены
    if (routes instanceof Array) {
      this.routes = [...this.routes, ...routes]
    }
  }

  /**
   * Расширить хранилище состояний контекста
   * @param {Object|Function} store хранилище состояний
   */
  extendStore(store) {
    store = store instanceof Function ? store.call(null, this.getArea()) : store

    // Если хранилище получено
    if (store) {
      // Модули хранилища состояний
      const modules = {}

      // Обойти карту модулей хранилища
      for (const [name, storeModule] of Object.entries(store)) {
        modules[name] = storeModule
        modules[name].namespaced = true
      }

      this.store.modules = { ...this.store.modules, ...modules }
    }
  }

  /**
   * Расширить зависимости контекста
   * @param {Object} dependencies зависимости
   * @param {Boolean} force позволяется перезапись зависимости
   */
  extendDependencies(dependencies, force = false) {
    dependencies = dependencies instanceof Function ? dependencies.call(null, this.getArea()) : dependencies

    // Если зависимости получены
    if (dependencies) {
      // Обойти карту зависимостей
      for (const [address, dependency] of Object.entries(dependencies)) {
        this.set(address, dependency, force)
      }
    }
  }

  /**
   * Расширить коллекцию плагинов контекста
   * @param {Array|Function} plugins плагины
   */
  extendPlugins(plugins) {
    plugins = plugins instanceof Function ? plugins.call(null, this.getArea()) : plugins

    // Если плагины получены
    if (plugins instanceof Array) {
      this.plugins = [...this.plugins, ...plugins]
    }
  }
}
