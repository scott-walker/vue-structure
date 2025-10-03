import type { Config } from "@types"

/**
 * Интерфейс конфигурации приложения
 */
export type AppConfig = {
  main: {
    debug: boolean
    baseUrl: string
  }
  utils: {
    localStorage: {
      storageKey: string
    }
    httpClient: {
      baseUrl: string
    }
  }
}

/**
 * Конфигурация приложения
 */
export const config: Config<AppConfig> = {
  main: {
    debug: true,
    baseUrl: "/"
  },
  utils: {
    localStorage: {
      storageKey: "app"
    },
    httpClient: {
      baseUrl: "http://localhost:8081"
    }
  }
}
