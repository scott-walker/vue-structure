import { type App as VueApp } from "vue"
import { type Context, type VueComponentWithContext, type ComponentContextItem } from "@types"

/**
 * Плагин. Контекст приложения
 */
export default class ContextPlugin {
  private context: Context
  private contextComponentsMap: { [key: string]: Record<string, unknown> }

  /**
   * Инициализировать плагин
   * @param context контекст приложения
   */
  constructor(context: Context) {
    this.context = context
    this.contextComponentsMap = {}
  }

  /**
   * Установить плагин
   * @param app экземпляр Vue приложения
   */
  install(app: VueApp) {
    const contextPlugin = this
    app.mixin({
      beforeCreate() {
        contextPlugin.createContext(this)
      },

      beforeUnmount() {
        contextPlugin.removeContext(this)
      }
    })

    // Прокинуть доступ к контексту в компоненты
    app.config.globalProperties.$context = this.context
  }

  /**
   * Создать контекст компонента
   * @param component экземпляр Vue компонента
   */
  createContext(component: VueComponentWithContext) {
    // Получить карту контекста
    const map = component.$options?.context

    // Если есть карта контекста
    if (map) {
      // ID компонента
      const id = component._uid

      // Контекст компонента
      let context = null

      // Если карта контекста определена как массив
      if (Array.isArray(map)) {
        context = map.reduce((dependencies: Record<string, unknown>, data: ComponentContextItem) => {
          let name: string | null = null
          let address: string | null = null
          let method: "make" | "invoke" = "invoke"

          // Если запись является строкой
          if (typeof data === "string") {
            address = data
            name = data
          }
          // Если запись является объектом со свойством from
          else if (typeof data === "object" && data !== null && "from" in data) {
            address = data.from
            name = data.name || data.from
            method = data.method || method
          } else {
            throw `Проблемы с описанием зависимости в компоненте ${component.name || "Unknown"}`
          }

          if (address && name) {
            const contextMethod = this.context[method] as (address: string) => unknown
            dependencies[name] = contextMethod.call(this.context, address)
          }

          return dependencies
        }, {})
      }

      // Если карта контекста определена как функция обратного вызова
      else if (map instanceof Function) {
        context = map.call(null, this.context)
      }

      // Если карта контекста определена как объект-карта
      else if (typeof map === "object" && map !== null) {
        context = Object.entries(map).reduce((dependencies: Record<string, unknown>, [name, data]) => {
          let address: string | null = null
          let method: "make" | "invoke" = "invoke"

          // Если запись является строкой
          if (typeof data === "string") {
            address = data
          }
          // Если запись является объектом со свойством from
          else if (typeof data === "object" && data !== null && "from" in data) {
            address = data.from
            name = data.prop || name
            method = data.method || method
          } else {
            throw `Проблемы с описанием зависимости "${name}" в компоненте ${component.name || "Unknown"}`
          }

          if (address) {
            const contextMethod = this.context[method] as (address: string) => unknown
            dependencies[name] = contextMethod.call(this.context, address)
          }

          return dependencies
        }, {})
      }

      // Если контекст сформирован
      if (context && id !== undefined) {
        // Определить свойства-зависисмости компонента
        for (const [name, dependency] of Object.entries(context)) {
          component[this.generateDependencyPropName(name)] = dependency
        }

        // Запомнить контекст компонента
        this.contextComponentsMap[id] = context
      }
    }
  }

  /**
   * Удалить контекст компонента
   * @param component экземпляр Vue компонента
   */
  removeContext(component: VueComponentWithContext) {
    // ID компонента
    const id = component._uid

    // Если ID не определен, ничего не делаем
    if (id === undefined) {
      return
    }

    // Контекст компонента
    const context = this.contextComponentsMap[id]

    // Если контекст найден
    if (context) {
      // Удалить свойства-зависисмости компонента
      for (const address of Object.keys(context)) {
        delete component[this.generateDependencyPropName(address)]
      }

      // Удалить контекст компонента
      delete this.contextComponentsMap[id]
    }
  }

  /**
   * Генерировать название свойства-зависисмости
   * @param address адрес зависисмости
   * @return название свойства
   */
  generateDependencyPropName(address: string): string {
    return `$${address}`
  }
}
