import TextModel from "../models/TextModel"

interface TextServiceConfig {
  timeout?: number
}

/**
 * Сервис для работы с текстом
 */
export default class TextService {
  private textModel: TextModel
  private timeout: number

  /**
   * Инициализировать текст
   * @param textModel модель текста
   * @param config конфигурация сервиса
   */
  constructor(textModel: TextModel, config: TextServiceConfig = {}) {
    this.textModel = textModel
    this.timeout = config.timeout || 1000
  }

  /**
   * Получить текст
   */
  getText(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.textModel.get())
      }, this.timeout)
    })
  }
}
