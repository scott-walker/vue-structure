/**
 * Конфигурация менеджера доступа
 */
export interface AccessManagerConfig {
  /** Роли пользователя */
  roles: string[]
  /** Разрешения пользователя */
  permissions: string[]
  /** Ключ для хранения данных аутентификации в localStorage */
  authKey?: string
  /** Включить логирование */
  enableLogging?: boolean
}

/**
 * Конфигурация HTTP клиента
 */
export interface HttpClientConfig {
  /** Базовый URL для запросов */
  baseUrl: string
  /** Таймаут запросов в миллисекундах */
  timeout?: number
  /** Заголовки по умолчанию */
  defaultHeaders?: Record<string, string>
  /** Включить логирование */
  enableLogging?: boolean
}

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
