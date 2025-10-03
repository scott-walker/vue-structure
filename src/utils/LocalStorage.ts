import type { ILocalStorage, LocalStorageConfig } from "@types"

/**
 * Утилита. Локальное хранилище
 */
export class LocalStorage implements ILocalStorage {
  private config: Required<LocalStorageConfig>

  /**
   * Инициализировать хранилище
   * @param config конфигурация хранилища
   */
  constructor(config: LocalStorageConfig) {
    this.config = {
      storageKey: config.storageKey || "app"
    }
  }

  /**
   * Установить данные в хранилище
   * @param key ключ для хранения
   * @param value значение для сохранения
   */
  set(key: string, value: unknown): void {
    localStorage.setItem(this.makeKey(key), JSON.stringify(value))
  }

  /**
   * Получить данные из хранилища
   * @param key ключ для получения данных
   * @param defaultValue значение по умолчанию
   * @returns сохраненное значение или значение по умолчанию
   */
  get<T = unknown>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(this.makeKey(key))

      if (item === null) {
        return defaultValue
      }

      return JSON.parse(item)
    } catch (error) {
      console.warn(`[LocalStorage] Key "${key}" not found:`, error)

      return defaultValue
    }
  }

  /**
   * Удалить данные из хранилища
   * @param key ключ для удаления
   */
  remove(key: string): void {
    localStorage.removeItem(this.makeKey(key))
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
    return localStorage.getItem(this.makeKey(key)) !== null
  }

  /**
   * Сформировать ключ
   * @param key ключ для формирования
   */
  private makeKey(key: string): string {
    return `${this.config.storageKey}.${key}`
  }
}
