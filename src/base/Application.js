import Vue from "vue"
import Vuex from "vuex"
import Router from "vue-router"
import Context from "@base/Context"
import corePlugins from "@base/plugins"

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

    // Регистрировать ресурсы ядра
    this.registerCoreAssets()
    // Регистрировать модули приложения
    this.registerModules()
    // Регистрировать плагины приложения
    this.registerPlugins()
    // Инициализировать маршрутизатор
    this.initRouter()
    // Инициализировать хранилище состояний
    this.initStore()
    // Инициализировать Vue приложение
    this.initApp()
  }

  /**
   * Регистрировать ресурсы ядра
   */
  registerCoreAssets() {
    // Расширить контекст плагинами ядра
    this.context.extendPlugins(corePlugins)
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
   * Регистрировать плагины приложения
   */
  registerPlugins() {
    // Получить плагины из контекста
    const { plugins } = this.context.getAssets()

    // Обойти все плагины контекста
    plugins.forEach(({ plugin, options }) => {
      plugin = plugin instanceof Function ? plugin.call(null, Vue) : plugin
      options = options || {}

      Vue.use(plugin, options)
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
