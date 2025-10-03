import type { Component as VueComponent, App as VueInstance } from "vue"
import type { createPinia } from "pinia"
import type { createRouter, RouteRecordRaw } from "vue-router"

/**
 * Конфигурация
 */
export type Config<C = unknown> = C

/**
 * Маршрутизатор
 */
export type Router = ReturnType<typeof createRouter>

/**
 * Маршруты
 */
export type RouterRoute = RouteRecordRaw

/**
 * Хранилище состояний
 */
export type Store = ReturnType<typeof createPinia>

/**
 * Модуль хранилища состояний
 */
export type StoredApi<T = unknown> = () => T

/**
 * Карта модулей хранилища состояний
 */
export type StoredMap = Map<ModuleId, StoredApi>

/**
 * ID модуля общедоступного API
 */
export type SharedId = string

/**
 * Модуль общедоступного API
 */
export type SharedApi = Record<SharedId, unknown>

/**
 * Карта модулей общедоступных API
 */
export type SharedMap = Map<ModuleId, SharedApi>

/**
 * Пропсы контекста
 */
export type ContextProps = {
  config?: Config
  router?: Router
  stored?: StoredMap
  shared?: SharedMap
}

/**
 * Общедоступный API контекста (для модулей)
 */
export type SharedContext = {
  config: Config
  useRouter: () => Router
  useStored: <T = StoredApi>(id: ModuleId) => T
  useShared: <T = SharedApi>(id: ModuleId) => T
}

/**
 * Контекст приложения
 */
export interface IContext {
  config: Config
  router: Router | null
  stored: StoredMap
  shared: SharedMap
  setConfig: (config: Config) => void
  setRouter: (router: Router) => void
  setStored: (id: ModuleId, stored: StoredApi) => void
  setShared: (id: ModuleId, shared: SharedApi) => void
  useRouter: () => Router
  useStored: <T = StoredApi>(id: ModuleId) => T
  useShared: <T = SharedApi>(id: ModuleId) => T
}

/**
 * ID модуля
 */
export type ModuleId = string

/**
 * Интерфейс модуля
 * @param id ID модуля
 * @param inirRoutes Инициализатор маршрутов модуля
 * @param initStored Инициализатор хранилища состояний модуля
 * @param initShared Инициализатор API модуля (общедоступный API)
 */
export interface IModule {
  id: ModuleId
  inirRoutes?: (context: SharedContext) => RouterRoute[]
  initStored?: (context: SharedContext) => StoredApi
  initShared?: (context: SharedContext) => SharedApi
}

/**
 * Пропсы модуля
 */
export type ModuleProps = {
  id: IModule["id"]
  inirRoutes?: IModule["inirRoutes"]
  initStored?: IModule["initStored"]
  initShared?: IModule["initShared"]
}

/**
 * Пропсы приложения
 * @param root Корневой компонент приложения
 * @param modules Массив модулей приложения
 */
export type ApplicationProps = {
  root: VueComponent
  context: IContext
  modules: IModule[]
}

/**
 * Интерфейс приложения
 */
export interface IApplication {
  vue?: VueInstance
  context: IContext
  router: Router
  store: Store
}

export type { VueComponent, VueInstance }
