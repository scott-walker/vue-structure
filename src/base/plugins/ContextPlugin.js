/**
 * Плагин. Контекст приложения
 */
export default class ContextPlugin {
  /**
   * Инициализировать плагин
   * @param {Object} context контекст приложения
   */
  constructor(context) {
    this.context = context
    this.contextComponentsMap = {}
  }

  /**
   * Установить плагин
   * @param {Object} Vue
   */
  install(Vue) {
    const plugin = this

    // Расширить компоненты
    Vue.mixin({
      beforeCreate() {
        plugin.createContext(this)
      },

      beforeDestroy() {
        plugin.removeContext(this)
      }
    })

    // Прокинуть доступ к контексту в компоненты
    Vue.prototype.$context = this.context
  }

  /**
   * Создать контекст компонента
   * @param {Object} component экземпляр Vue компонента
   */
  createContext(component) {
    // Получить карту контекста
    const map = component.$options.context

    // Если есть карта контекста
    if (map) {
      // ID компонента
      const id = component._uid

      // Контекст компонента
      let context = null

      // Если карта контекста определена как массив
      if (map instanceof Array) {
        context = map.reduce((dependencies, data) => {
          let name = null
          let address = null
          let method = "invoke"

          // Если запись является строкой
          if (typeof data === "string") {
            address = data
            name = data
          }
          // Если запись является объектом со свойством from
          else if (data instanceof Object && "from" in data) {
            address = data.from
            name = data.name || data.from
            method = data.method || method
          } else {
            throw `Проблемы с описанием зависимости в компоненте ${component.name}`
          }

          if (address && name) {
            dependencies[name] = this.context[method].call(null, address)
          }

          return dependencies
        }, {})
      }

      // Если карта контекста определена как функция обратного вызова
      else if (map instanceof Function) {
        context = map.call(null, this.context)
      }

      // Если карта контекста определена как объект-карта
      else if (map instanceof Object) {
        context = Object.entries(map).reduce((dependencies, [name, data]) => {
          let address = null
          let method = "invoke"

          // Если запись является строкой
          if (typeof data === "string") {
            address = data
          }
          // Если запись является объектом со свойством from
          else if (data instanceof Object && "from" in data) {
            address = data.from
            name = data.prop || name
            method = data.method || method
          } else {
            throw `Проблемы с описанием зависимости "${name}" в компоненте ${component.name}`
          }

          if (address) {
            dependencies[name] = this.context[method].call(null, address)
          }

          return dependencies
        }, {})
      }

      // Если контекст сформирован
      if (context) {
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
   * @param {Object} component экземпляр Vue компонента
   */
  removeContext(component) {
    // ID компонента
    const id = component._uid

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
   * @param {String} address адрес зависисмости
   * @return {String} название свойства
   */
  generateDependencyPropName(address) {
    return `$${address}`
  }
}
