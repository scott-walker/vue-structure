import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { createPinia, defineStore } from "pinia"

import type {
  VueInstance,
  IApplication,
  IContext,
  IModule,
  ApplicationProps,
  Router,
  Store,
  ModuleId,
  SharedContext,
  StoredApi,
  SharedApi
} from "@types"
import { ApplicationError } from "./ApplicationError"

/**
 * Приложение
 * @param vue Экземпляр Vue приложения
 * @param context Контекст приложения
 * @param router Маршрутизатор
 * @param store Движок хранилища состояний
 */
export class Application implements IApplication {
  public vue?: VueInstance
  public context: IContext
  public router: Router
  public store: Store

  /**
   * Инициализировать приложение
   */
  constructor({ root, context, modules }: ApplicationProps) {
    this.vue = createApp(root)

    // Создать маршрутизатор
    this.router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: []
    })

    // Создать хранилище состояний
    this.store = createPinia()

    // Установить контекст
    this.context = context
    this.context.setRouter(this.router)

    // Зарегистрировать модули
    modules.forEach(module => this.registerModule(module))

    this.vue.use(this.router)
    this.vue.use(this.store)
    this.vue.provide("context", this.shareContext())
  }

  /**
   * Монтировать приложение
   * @param selector
   */
  public mount(selector: string): void {
    if (!this.vue) {
      throw new ApplicationError("Application not built")
    }

    this.vue.mount(selector)
  }

  /**
   * Зарегистрировать модуль
   * @param module Модуль
   */
  private registerModule(module: IModule): void {
    // Добавить маршруты модуля
    if (module.inirRoutes !== undefined) {
      module.inirRoutes(this.shareContext()).forEach(route => this.router.addRoute(route))
    }

    // Добавить модуль хранилища состояний
    if (module.initStored !== undefined) {
      const useStore = defineStore(module.id, () => module.initStored?.(this.shareContext()))

      this.context.setStored(module.id, useStore)
    }

    // Добавить API модуля предоставляемый другим модулям
    if (module.initShared !== undefined) {
      this.context.setShared(module.id, module.initShared(this.shareContext()))
    }
  }

  /**
   * Расширить контекст
   */
  shareContext(): SharedContext {
    return {
      config: this.context.config,
      useRouter: () => this.context.useRouter(),
      useStored: <T = StoredApi>(id: ModuleId) => this.context.useStored<T>(id),
      useShared: <T = SharedApi>(id: ModuleId) => this.context.useShared<T>(id)
    }
  }
}
