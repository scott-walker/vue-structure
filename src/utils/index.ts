import type { UtilsConfig } from "@types"

import { AccessManager } from "./AccessManager"
import { HttpClient } from "./HttpClient"
import { LocalStorage } from "./LocalStorage"

/**
 * Инициализировать утилиты
 * @param config конфигурация утилит
 */
export const initUtils = (config: UtilsConfig) => {
  const localStorage = new LocalStorage(config.localStorage)
  const accessManager = new AccessManager(localStorage, config.accessManager)
  const httpClient = new HttpClient(config.httpClient)

  return {
    localStorage,
    accessManager,
    httpClient
  }
}
