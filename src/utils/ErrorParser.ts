/**
 * Конфигурация парсера ошибок
 */
export interface ErrorParserConfig {
  /** Сообщение по умолчанию для неизвестных ошибок */
  defaultMessage?: string
  /** Включить логирование ошибок */
  enableLogging?: boolean
  /** Префикс для логов */
  logPrefix?: string
}

/**
 * Утилита. Парсер ошибок
 */
export default class ErrorParser {
  private config: Required<ErrorParserConfig>

  /**
   * Инициализировать парсер
   * @param config конфигурация парсера
   */
  constructor(config: ErrorParserConfig = {}) {
    this.config = {
      defaultMessage: "Ошибка",
      enableLogging: false,
      logPrefix: "[ErrorParser]",
      ...config
    }
  }

  /**
   * Парсить ошибку
   * @param error объект ошибки
   * @returns отформатированное сообщение об ошибке
   */
  parse(error: unknown): string {
    let message = this.config.defaultMessage

    if (error instanceof Error) {
      message = error.message
    } else if (error && typeof error === "object" && "message" in error) {
      message = String(error.message)
    } else if (typeof error === "string") {
      message = error
    }

    if (this.config.enableLogging) {
      console.error(`${this.config.logPrefix} ${message}`, error)
    }

    return message
  }

  /**
   * Парсить ошибку с дополнительной информацией
   * @param error объект ошибки
   * @param context дополнительный контекст
   * @returns отформатированное сообщение об ошибке с контекстом
   */
  parseWithContext(error: unknown, context?: string): string {
    const message = this.parse(error)

    if (context) {
      return `${context}: ${message}`
    }

    return message
  }

  /**
   * Проверить, является ли объект ошибкой
   * @param value значение для проверки
   * @returns true если значение является ошибкой
   */
  isError(value: unknown): value is Error {
    return value instanceof Error
  }
}
