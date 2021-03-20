import Vue from "vue"
import Vuex from "vuex"
import Router from "vue-router"
import Context from "@base/Context"

/**
 * Приложение
 */
export default class Application {
  /**
   * Инициализировать приложение
   * @param {Object} component
   * @param {Array} modules
   * @param {Object} context
   * @param {Object} config
   */
  constructor(component, modules, context, config) {
    if (!component) {
      throw "Необходимо передать корневой Vue компонент"
    }
    if (!(modules instanceof Array) || !modules.length) {
      throw "Необходимо передать модули приложения"
    }

    this.component = component
    this.modules = modules
    this.context = context || new Context()
    this.config = config || {}
    this.routes = []
    this.store = {}

    // Регистрировать модули приложения
    this.registerModules()
    // Инициализировать маршрутизатор
    this.initRouter()
    // Инициализировать хранилище состояний
    this.initStore()
    // Инициализировать Vue приложение
    this.initApp()
  }

  /**
   * Регистрировать модули приложения
   */
  registerModules() {
    // Обойти все модули приложения
    this.modules.forEach(appModule => {
      // Получить ресурсы модуля
      const { routes, stores, dependencies } = appModule.getAssets()

      // Если модуль имеет маршруты
      if (routes) {
        // Расширить коллекцию маршрутов приложения
        this.extendRoutes(routes)
      }

      // Если модуль имеет хранилище состояний
      if (stores) {
        //  Расширить хранилище состояний приложения
        this.extendStore(stores)
      }

      // Если модуль имеет зависимости
      if (dependencies) {
        // Расширить зависимости контекста приложения
        this.extendDependencies(dependencies)
      }
    })
  }

  /**
   * Инициализировать маршрутизатор
   */
  initRouter() {
    Vue.use(Router)

    this.router = new Router({
      mode: "history",
      base: this.config.baseUrl,
      routes: this.routes
    })
  }

  /**
   * Инициализировать хранилище состояний
   */
  initStore() {
    Vue.use(Vuex)

    this.store = new Vuex.Store(this.store)
  }

  /**
   * Инициализировать Vue приложение
   */
  initApp() {
    Vue.config.productionTip = !this.config.debug

    this.vue = new Vue({
      router: this.router,
      store: this.store,
      render: h => h(this.component)
    })
  }

  /**
   * Монтировать приложение
   * @param {String} selector селектор DOM элемента
   */
  mount(selector) {
    this.vue.$mount(selector)
  }

  /**
   * Расширить коллекцию маршрутов приложения
   * @param {Array|Function} routes маршруты
   */
  extendRoutes(routes) {
    routes = routes instanceof Function ? routes.call(null, this.context.getArea()) : routes

    this.routes = [...this.routes, ...routes]
  }

  /**
   * Расширить хранилище состояний приложения
   * @param {Object|Function} store хранилище состояний
   */
  extendStore(store) {
    const modules = {}
    const storeMap = store instanceof Function ? store.call(null, this.context.getArea()) : store

    // Обойти карту модулей хранилища
    for (const [name, storeModule] of Object.entries(storeMap)) {
      modules[name] = storeModule
      modules[name].namespaced = true
    }

    this.store.modules = { ...this.store.modules, ...modules }
  }

  /**
   * Расширить зависимости контекста приложения
   * @param {Object} dependencies зависимости
   */
  extendDependencies(dependencies) {
    dependencies = dependencies instanceof Function ? dependencies.call(null, this.context.getArea()) : dependencies

    this.context.setDependencies(dependencies)
  }
}
