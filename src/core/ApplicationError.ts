/**
 * Ошибка приложения
 */
export class ApplicationError extends Error {
  /**
   * Конструктор ошибки
   */
  public name: string = "ApplicationError"

  /**
   * Конструктор ошибки
   */
  constructor(message: string) {
    super(message)
  }
}
