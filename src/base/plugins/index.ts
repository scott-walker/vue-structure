import ContextPlugin from "./ContextPlugin"
import { type Context, type Plugin } from "@types"

/**
 * Плагины ядра приложения
 */
export default (context: Context): Array<{ plugin: () => Plugin; options: Record<string, unknown> }> => {
  return [
    {
      plugin: () => new ContextPlugin(context),
      options: {}
    }
  ]
}
