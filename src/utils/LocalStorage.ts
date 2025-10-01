/**
 * Хранилище
 */
export default class LocalStorage {
  /**
   * Установить данные в хранилище
   * @param key ключ для хранения
   * @param value значение для сохранения
   */
  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * Получить данные из хранилища
   * @param key ключ для получения данных
   * @param defaultValue значение по умолчанию
   * @returns сохраненное значение или значение по умолчанию
   */
  get<T = unknown>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.warn(`Ошибка при чтении из localStorage для ключа "${key}":`, error)
      return defaultValue
    }
  }

  /**
   * Удалить данные из хранилища
   * @param key ключ для удаления
   */
  remove(key: string): void {
    localStorage.removeItem(key)
  }

  /**
   * Очистить все данные из хранилища
   */
  clear(): void {
    localStorage.clear()
  }

  /**
   * Проверить существование ключа в хранилище
   * @param key ключ для проверки
   * @returns true если ключ существует
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null
  }

  /**
   * Получить все ключи из хранилища
   * @returns массив всех ключей
   */
  keys(): string[] {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key !== null) {
        keys.push(key)
      }
    }
    return keys
  }
}
