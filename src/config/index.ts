import { type Config as BaseConfig } from "@types"

/**
 * Интерфейс конфигурации приложения
 */
export type Config = BaseConfig & {
  main: {
    debug: boolean
    baseUrl: string
  }
  utils: {
    accessManager: {
      roles: string[]
      permissions: string[]
    }
    httpClient: {
      baseUrl: string
    }
  }
}

export const config: Config = {
  main: {
    debug: true,
    baseUrl: "/"
  },
  utils: {
    accessManager: {
      roles: [],
      permissions: []
    },
    httpClient: {
      baseUrl: "http://localhost:8081"
    }
  }
}
