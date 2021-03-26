/**
 * Утилита. Парсер ошибок
 */
export default class ErrorParser {
  /**
   * Инициализировать парсер
   * @param {Object} config
   */
  constructor(config) {
    this.config = config || {}
  }

  /**
   * Парсить ошибку
   * @param {Object} error
   */
  parse(error) {
    return (error && error.message) || "Ошибка"
  }
}
