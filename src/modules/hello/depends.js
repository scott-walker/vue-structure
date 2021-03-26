import TextModel from "./models/TextModel"
import TextService from "./services/TextService"

/**
 * Зависимости модуля
 */
export default ({ make }) => {
  const model = { id: 1, content: `Test: ${Math.random()}` }
  const textServiceConfig = { timeout: 3000 }

  return {
    "@hello/models/TextModel": data => new TextModel(data),
    "@hello/services/TextService": () => new TextService(make("@hello/models/TextModel", model), textServiceConfig)
  }
}
