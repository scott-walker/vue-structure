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
      const assets = appModule.getAssets()

      // Расширить контекст ресурсами модуля
      this.context.extend(assets)
    })
  }

  /**
   * Инициализировать маршрутизатор
   */
  initRouter() {
    Vue.use(Router)

    // Получить маршруты из контекста
    const { routes } = this.context.getAssets()

    this.router = new Router({
      mode: "history",
      base: this.config.baseUrl,
      routes
    })
  }

  /**
   * Инициализировать хранилище состояний
   */
  initStore() {
    Vue.use(Vuex)

    // Получить хранилище состояний из контекста
    const { store } = this.context.getAssets()

    this.store = new Vuex.Store(store)
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
}
