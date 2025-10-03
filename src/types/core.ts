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
 * Инициализатор маршрутов модуля
 */
export type ModuleInitRoutes = (context: SharedContext) => RouterRoute[]

/**
 * Инициализатор хранилища состояний модуля
 */
export type ModuleInitStored<T = StoredApi> = (context: SharedContext) => T

/**
 * Инициализатор API модуля (общедоступный API)
 */
export type ModuleInitShared<T = SharedApi> = (context: SharedContext) => T

/**
 * Интерфейс модуля
 * @param id ID модуля
 * @param inirRoutes Инициализатор маршрутов модуля
 * @param initStored Инициализатор хранилища состояний модуля
 * @param initShared Инициализатор API модуля (общедоступный API)
 */
export interface IModule<ST = StoredApi, SH = SharedApi> {
  id: ModuleId
  inirRoutes?: ModuleInitRoutes
  initStored?: ModuleInitStored<ST>
  initShared?: ModuleInitShared<SH>
}

/**
 * Пропсы модуля
 */
export type ModuleProps<ST = StoredApi, SH = SharedApi> = Pick<
  IModule<ST, SH>,
  "id" | "inirRoutes" | "initStored" | "initShared"
>

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
