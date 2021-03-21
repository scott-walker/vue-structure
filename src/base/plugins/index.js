import ContextPlugin from "./ContextPlugin"

/**
 * Плагины ядра приложения
 */
export default context => {
  return [
    {
      plugin: () => new ContextPlugin(context),
      options: {}
    }
  ]
}
