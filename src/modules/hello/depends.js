import TextModel from "./models/TextModel"
import TextService from "./services/TextService"

/**
 * Зависимости модуля
 */
export default ({ config, make, invoke }) => {
  return [
    {
      textModel: params => new TextModel(params),
      textService: () => new TextService(make("textModel", { id: null }), invoke("errorParser"), config.baseUrl)
    }
  ]
}
