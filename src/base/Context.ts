import { type RouteRecordRaw } from "vue-router"
import {
  type ContextAssets,
  type ContextScope,
  type ContextDependency,
  type ContextDependencyAddress,
  type Config,
  type Plugin,
  type StoreModule
} from "@types"

/**
 * Контекст приложения
 */
export default class Context {
  // Конфигурация контекста
  public config: Config
  // Коллекция маршрутов
  public routes: RouteRecordRaw[]
  // Хранилище состояний
  public store: { modules: StoreModule }
  // Коллекция зависимостей
  public dependencies: { [key: string]: ContextDependency }
  // Коллекция плагинов
  public plugins: Plugin[]
  // Коллекция экземпляров зависимостей
  public instances: { [key: string]: ContextDependency }

  /**
   * Инициализировать контекст
   * @param config конфигурация контекста
   * @param assets ресурсы контекста
   */
  constructor(config?: Config, assets?: ContextAssets) {
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
   * @param address адрес зависимости
   * @param dependency зависимость
   * @param force позволяется перезапись зависимости
   */
  public set(address: ContextDependencyAddress, dependency: ContextDependency, force: boolean = false): void {
    // Если отключена форсированная перезапись и зависимость с заданным адресом уже существует
    if (!force && this.dependencies[address]) {
      throw `Зависимость с адресом "${address}" уже существует`
    }

    this.dependencies[address] = dependency
  }

  /**
   * Получить область видимости
   * @return область видимости
   */
  public getScope(): ContextScope {
    return {
      config: this.config,
      make: this.make.bind(this),
      invoke: this.invoke.bind(this)
    }
  }

  /**
   * Получить ресурсы контекста
   * @return
   */
  public getAssets(): ContextAssets {
    return {
      routes: this.routes,
      store: this.store,
      dependencies: this.dependencies,
      plugins: this.plugins
    }
  }

  /**
   * Сделать новый экземпляр зависимости
   * @param address адрес зависимости
   * @param params параметры зависимости
   * @return экземпляр зависимости
   */
  public make<T = ContextDependency>(address: ContextDependencyAddress, params?: unknown): T {
    const dependency = this.dependencies[address]

    if (!dependency) {
      throw `Зависимость по адресу "${address}" не существует`
    }

    if (dependency instanceof Function) {
      return dependency.call(null, params, this.getScope()) as T
    }

    return dependency as T
  }

  /**
   * Вызвать экземпляр зависимости
   * @param address адрес зависимости
   * @return экземпляр зависимости
   */
  public invoke<T = ContextDependency>(address: ContextDependencyAddress): T {
    if (!this.instances[address]) {
      this.instances[address] = this.make(address)
    }

    return this.instances[address] as T
  }

  /**
   * Расширить контекст
   * @param assets
   */
  public extend({ routes, store, dependencies, plugins }: ContextAssets): void {
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

    // Если передано хранилище состояний
    if (store) {
      //  Расширить хранилище состояний
      this.extendStore(store)
    }

    // Если переданы маршруты
    if (routes) {
      // Расширить коллекцию маршрутов
      this.extendRoutes(routes)
    }
  }

  /**
   * Расширить коллекцию маршрутов контекста
   * @param routes маршруты
   */
  public extendRoutes(routes: RouteRecordRaw[] | ((scope: ContextScope) => RouteRecordRaw[])): void {
    const resolvedRoutes = routes instanceof Function ? routes.call(null, this.getScope()) : routes

    // Если маршруты получены
    if (resolvedRoutes instanceof Array) {
      this.routes = [...this.routes, ...resolvedRoutes]
    }
  }

  /**
   * Расширить хранилище состояний контекста
   * @param store хранилище состояний
   */
  public extendStore(store: { modules: StoreModule } | ((scope: ContextScope) => { modules: StoreModule })): void {
    const resolvedStore = store instanceof Function ? store.call(null, this.getScope()) : store

    // Если хранилище получено
    if (resolvedStore) {
      // Объединить модули хранилища состояний
      this.store.modules = { ...this.store.modules, ...resolvedStore.modules }
    }
  }

  /**
   * Расширить зависимости контекста
   * @param dependencies зависимости
   * @param force позволяется перезапись зависимости
   */
  public extendDependencies(
    dependencies:
      | { [key: string]: ContextDependency }
      | ((scope: ContextScope) => { [key: string]: ContextDependency }),
    force: boolean = false
  ): void {
    const resolvedDependencies =
      dependencies instanceof Function ? dependencies.call(null, this.getScope()) : dependencies

    // Если зависимости получены
    if (resolvedDependencies) {
      // Обойти карту зависимостей
      for (const [address, dependency] of Object.entries(resolvedDependencies)) {
        this.set(address, dependency, force)
      }
    }
  }

  /**
   * Расширить коллекцию плагинов контекста
   * @param plugins плагины
   */
  public extendPlugins(plugins: Plugin[] | ((scope: ContextScope) => Plugin[])): void {
    const resolvedPlugins = plugins instanceof Function ? plugins.call(null, this.getScope()) : plugins

    // Если плагины получены
    if (resolvedPlugins instanceof Array) {
      this.plugins = [...this.plugins, ...resolvedPlugins]
    }
  }
}
