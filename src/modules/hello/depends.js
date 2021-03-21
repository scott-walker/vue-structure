import TextModel from "./models/TextModel"
import TextService from "./services/TextService"

/**
 * Зависимости модуля
 */
export default ({ make }) => {
  const model = { id: 1, content: `Test: ${Math.random()}` }
  const textServiceConfig = { timeout: 3000 }

  return {
    textModel: data => new TextModel(data),
    textService: () => new TextService(make("textModel", model), textServiceConfig)
  }
}
