/**
 * Хранилище
 */
export default class Storage {
  /**
   * Установить данные в хранилище
   * @param {String} key
   * @param {Object|String|Number} value
   */
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * Получить данные из хранилища
   * @param {String} key
   * @param {*} defaultValue
   */
  get(key, defaultValue = null) {
    const value = JSON.parse(localStorage.getItem(key))

    return value !== null ? value : defaultValue
  }

  /**
   * Удалить данные из хранилища
   * @param {String} key
   */
  remove(key) {
    localStorage.removeItem(key)
  }
}
