/**
 * Сервис для работы с текстом
 */
export default class TextService {
  /**
   * Инициализировать текст
   * @param {Object} textModel
   * @param {Object} config
   */
  constructor(textModel, config) {
    this.textModel = textModel
    this.timeout = (config && config.timeout) || 1000
  }

  /**
   * Получить текст
   */
  getText() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.textModel.get())
      }, this.timeout)
    })
  }
}
