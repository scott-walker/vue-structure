import { createApp, type App as VueApp, type Component } from "vue"
import { createRouter, createWebHistory, type Router } from "vue-router"
import { type Module, type Config, type Plugin, type ContextAssets } from "@types"
import Context from "@base/Context"
import corePlugins from "./plugins"
import StoreManager from "./StoreManager"

/**
 * Приложение
 */
export default class Application {
  // Корневой компонент Vue
  public component: Component
  // Массив модулей приложения
  public modules: Module[]
  // Контекст приложения
  public context: Context
  // Конфигурация приложения
  public config: Config
  // Экземпляр Vue приложения
  public vue!: VueApp
  // Экземпляр маршрутизатора
  public router!: Router
  // Менеджер хранилища состояний
  public storeManager!: StoreManager

  /**
   * Инициализировать приложение
   * @param component
   * @param modules
   * @param context
   * @param config
   */
  constructor(component: Component, modules: Module[], context?: Context, config?: Config) {
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
    // Инициализировать хранилище состояний
    this.initStore()
    // Инициализировать маршрутизатор
    this.initRouter()
    // Инициализировать Vue приложение
    this.initApp()
    // Регистрировать плагины приложения
    this.registerPlugins()
  }

  /**
   * Регистрировать ресурсы ядра
   */
  private registerCoreAssets(): void {
    // Расширить контекст плагинами ядра
    const corePluginsArray = corePlugins(this.context)
    this.context.extendPlugins(corePluginsArray.map(p => p.plugin()))
  }

  /**
   * Регистрировать модули приложения
   */
  private registerModules(): void {
    // Обойти все модули приложения
    this.modules.forEach(appModule => {
      // Получить ресурсы модуля
      const assets = appModule.getAssets()

      // Расширить контекст ресурсами модуля
      this.context.extend(assets as ContextAssets)
    })
  }

  /**
   * Регистрировать плагины приложения
   */
  private registerPlugins(): void {
    // Получить плагины из контекста
    const { plugins } = this.context.getAssets()

    // Обойти все плагины контекста
    plugins?.forEach((plugin: Plugin) => {
      this.vue.use(plugin)
    })
  }

  /**
   * Инициализировать маршрутизатор
   */
  private initRouter(): void {
    // Получить маршруты из контекста
    const { routes } = this.context.getAssets()

    this.router = createRouter({
      history: createWebHistory((this.config as { baseUrl?: string })?.baseUrl || "/"),
      routes: routes || []
    })
  }

  /**
   * Инициализировать хранилище состояний
   */
  private initStore(): void {
    // Создать менеджер Store
    this.storeManager = new StoreManager()

    // Получить хранилище состояний из контекста
    const { store } = this.context.getAssets()

    // Зарегистрировать модули в Store
    if (store) {
      this.storeManager.registerModules(store.modules)
    }
  }

  /**
   * Инициализировать Vue приложение
   */
  private initApp(): void {
    this.vue = createApp(this.component)

    if ((this.config as { debug?: boolean })?.debug) {
      this.vue.config.performance = true
    }

    this.vue.use(this.router)
    this.vue.use(this.storeManager.getPinia())
  }

  /**
   * Монтировать приложение
   * @param selector селектор DOM элемента
   */
  public mount(selector: string): void {
    this.vue.mount(selector)
  }
}
