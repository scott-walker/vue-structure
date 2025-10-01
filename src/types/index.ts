import { type Component, type Plugin as BasePlugin, type App as VueApp } from "vue"
import { type RouteRecordRaw, type Router } from "vue-router"

/**
 * Конфигурация приложения
 */
export type Config = Record<string, unknown>

/**
 * Зависимость контекста
 */
export type ContextDependency = unknown

/**
 * Адрес зависимости
 */
export type ContextDependencyAddress = string

/**
 * Функция создания зависимости
 */
export type ContextMakeDependency = <T = ContextDependency>(address: ContextDependencyAddress, params?: unknown) => T

/**
 * Функция вызова зависимости
 */
export type ContextInvokeDependency = <T = ContextDependency>(address: ContextDependencyAddress) => T

/**
 * Область видимости контекста
 */
export type ContextScope = {
  config: Config
  make: ContextMakeDependency
  invoke: ContextInvokeDependency
}

/**
 * Ресурсы контекста
 */
export type ContextAssets = {
  routes?: RouteRecordRaw[]
  store?: { modules: StoreModule }
  dependencies?: { [key: string]: unknown }
  plugins?: Plugin[]
}

/**
 * Плагин
 */
export type Plugin = BasePlugin & {}

/**
 * Модуль
 */
export type Module = {
  id: string
  // Получить ресурсы модуля
  getAssets: () => ModuleAssets
  // Установить ресурсы модуля
  setAssets: (assets: ModuleAssets) => void
}

/**
 * Store
 */
export type Store = {
  id: string
  state: () => Record<string, unknown>
  getters?: Record<string, (state: Record<string, unknown>) => unknown>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: Record<string, (...args: any[]) => any>
}

/**
 * Store Module
 */
export type StoreModule = {
  [key: string]: Store
}

/**
 * Ресурсы модуля
 */
export type ModuleAssets = {
  routes?: RouteRecordRaw[] | ((scope: ContextScope) => RouteRecordRaw[])
  store?: StoreModule | ((scope: ContextScope) => StoreModule)
  dependencies?: unknown | ((scope: ContextScope) => unknown)
  plugins?: Plugin[] | ((scope: ContextScope) => Plugin[])
}

/**
 * Сервис
 */
export type Service = unknown

/**
 * Приложение
 */
export type Application = {
  config: Config
  context: Context
  modules: Module[]
  root: Component
  dependencies: { [key: string]: Service }
  plugins: Plugin[]
  store: unknown
  router: Router
  vue: VueApp
}

/**
 * Контекст приложения
 */
export type Context = {
  // Конфигурация контекста
  config: Config
  // Коллекция маршрутов
  routes: RouteRecordRaw[]
  // Хранилище состояний
  store: { modules: StoreModule }
  // Коллекция зависимостей
  dependencies: { [key: string]: ContextDependency }
  // Коллекция плагинов
  plugins: Plugin[]
  // Коллекция экземпляров зависимостей
  instances: { [key: string]: ContextDependency }
  // Расширить зависимости
  extendDependencies: (dependencies: { [key: string]: ContextDependency }) => void
  // Установить зависимость
  set: (address: ContextDependencyAddress, dependency: ContextDependency, force?: boolean) => void
  // Получить область видимости
  getScope: () => ContextScope
  // Создать зависимость
  make: ContextMakeDependency
  // Вызвать зависимость
  invoke: ContextInvokeDependency
  // Расширить контекст
  extend: (assets: ContextAssets) => void
  // Расширить маршруты
  extendRoutes: (routes: RouteRecordRaw[] | ((scope: ContextScope) => RouteRecordRaw[])) => void
  // Расширить хранилище состояний
  extendStore: (store: { modules: StoreModule } | ((scope: ContextScope) => { modules: StoreModule })) => void
  // Расширить плагины
  extendPlugins: (plugins: Plugin[] | ((scope: ContextScope) => Plugin[])) => void
  // Получить ресурсы контекста
  getAssets: () => ContextAssets
}

/**
 * Vue компонент с контекстом
 */
export type VueComponentWithContext = {
  $options?: {
    context?: ComponentContextMap
  }
  _uid?: number
  name?: string
  [key: string]: unknown
}

/**
 * Карта контекста компонента
 */
export type ComponentContextMap =
  | string[]
  | ((context: Context) => Record<string, unknown>)
  | Record<string, ComponentContextItem>

/**
 * Элемент контекста компонента
 */
export type ComponentContextItem =
  | string
  | {
      from: string
      name?: string
      prop?: string
      method?: "make" | "invoke"
    }

/**
 * Плагин контекста
 */
export type ContextPlugin = {
  // Контекст приложения
  context: Context
  // Карта контекста компонента
  contextComponentsMap: { [key: string]: Record<string, unknown> }
  // Установить плагин
  install: (app: VueApp) => void
  // Создать контекст компонента
  createContext: (component: VueComponentWithContext) => void
  // Удалить контекст компонента
  removeContext: (component: VueComponentWithContext) => void
  // Генерировать название свойства-зависисмости
  generateDependencyPropName: (address: string) => string
}
