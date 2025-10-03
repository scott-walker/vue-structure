/**
 * Ошибка контекста
 */
export class ContextError extends Error {
  /**
   * Имя ошибки
   */
  public name: string = "ContextError"

  /**
   * Инициализировать ошибку контекста
   * @param message сообщение ошибки
   */
  constructor(message: string) {
    super(message)
  }
}
