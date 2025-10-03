/**
 * Ошибка модуля
 */
export class ModuleError extends Error {
  /**
   * Имя ошибки
   */
  public name: string = "ModuleError"

  /**
   * Инициализировать ошибку модуля
   * @param message сообщение ошибки
   */
  constructor(message: string) {
    super(message)
  }
}
