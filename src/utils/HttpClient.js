/**
 * Утилита. HTTP клиент
 */
export default class HttpClient {
  /**
   * Инициализировать клиента
   * @param {Object} config
   */
  constructor(config) {
    this.config = config
  }

  /**
   * Отправить POST запрос
   * @param {String} url
   * @param {Object} data
   */
  async post(url, data = {}) {
    const hash = `${JSON.stringify(data).length}-${Math.random()}-${Date.now()}`

    return new Promise(resolve => setTimeout(() => resolve(`${url}-${hash}`), 1000))
  }
}
