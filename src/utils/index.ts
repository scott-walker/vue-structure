import type { UtilsConfig } from "@types"

import { HttpClient } from "./HttpClient"
import { LocalStorage } from "./LocalStorage"

/**
 * Инициализировать утилиты
 * @param config конфигурация утилит
 */
export const initUtils = (config: UtilsConfig) => {
  const localStorage = new LocalStorage(config.localStorage)
  const httpClient = new HttpClient(config.httpClient)

  return {
    localStorage,
    httpClient
  }
}
