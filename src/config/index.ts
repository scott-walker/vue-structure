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
    accessManager: {
      authKey: string
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
    accessManager: {
      authKey: "auth"
    },
    httpClient: {
      baseUrl: "http://localhost:8081"
    }
  }
}
