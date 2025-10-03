import TextModel from "./models/TextModel"
import TextService from "./services/TextService"

// /**
//  * Зависимости модуля
//  */
// export const oldDepends = ({ make }: { make: (address: string, params?: unknown) => unknown }) => {
//   const model = { id: 1, content: `Test: ${Math.random()}` }
//   const textServiceConfig = { timeout: 3000 }

//   return {
//     "@hello/models/TextModel": (data: unknown) => new TextModel(data as { id: number; content: string }),
//     "@hello/services/TextService": () =>
//       new TextService(make("@hello/models/TextModel", model) as TextModel, textServiceConfig)
//   }
// }

/**
 * Зависимости модуля
 */
export default () => {
  const textModel = new TextModel({
    id: 1,
    content: `Test: ${Math.random()}`
  })

  return {
    textModel,
    textService: () => new TextService(textModel, { timeout: 3000 })
  }
}
