import AccessManager from "./AccessManager"
import HttpClient from "./HttpClient"
import ErrorParser from "./ErrorParser"
import LocalStorage from "./LocalStorage"
import type { AccessManagerConfig, HttpClientConfig, ErrorParserConfig } from "./types"

/**
 * Конфигурация утилит
 */
export interface UtilsConfig {
  accessManager: AccessManagerConfig
  httpClient: HttpClientConfig
  errorParser?: ErrorParserConfig
}

/**
 * Зависимости приложения
 */
export default ({ config }: { config: UtilsConfig }) => {
  return {
    "@utils/AccessManager": () => new AccessManager(config.accessManager),
    "@utils/HttpClient": () => new HttpClient(config.httpClient),
    "@utils/ErrorParser": () => new ErrorParser(config.errorParser),
    "@utils/Storage": () => new LocalStorage()
  }
}

// Экспорт типов для использования в других модулях
export type { AccessManagerConfig, HttpClientConfig, ErrorParserConfig } from "./types"
export type { AuthData } from "./AccessManager"
export type { HttpResponse, RequestOptions } from "./HttpClient"
export type { ErrorParserConfig as ErrorParserConfigType } from "./ErrorParser"
