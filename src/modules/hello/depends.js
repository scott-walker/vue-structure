import TextModel from "./models/TextModel"
import TextService from "./services/TextService"

/**
 * Зависимости модуля
 */
export default ({ make, invoke }) => {
  const model = { id: 1, content: "test" }

  return {
    textModel: data => new TextModel(data),
    textService: () => new TextService(make("textModel", model), invoke("errorParser"))
  }
}
