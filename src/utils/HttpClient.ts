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
 * Опции HTTP запроса
 */
export interface RequestOptions {
  /** HTTP метод */
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  /** Заголовки запроса */
  headers?: Record<string, string>
  /** Таймаут запроса */
  timeout?: number
  /** Параметры запроса */
  params?: Record<string, unknown>
}

/**
 * Ответ HTTP запроса
 */
export interface HttpResponse<T = unknown> {
  /** Данные ответа */
  data: T
  /** HTTP статус код */
  status: number
  /** Заголовки ответа */
  headers: Record<string, string>
  /** URL запроса */
  url: string
}

import ErrorParser from "./ErrorParser"

/**
 * Утилита. HTTP клиент
 */
export default class HttpClient {
  private config: Required<HttpClientConfig>
  private errorParser: ErrorParser

  /**
   * Инициализировать клиента
   * @param config конфигурация HTTP клиента
   */
  constructor(config: HttpClientConfig) {
    this.config = {
      timeout: 10000,
      defaultHeaders: {
        "Content-Type": "application/json"
      },
      enableLogging: false,
      ...config
    }
    this.errorParser = new ErrorParser({
      enableLogging: this.config.enableLogging
    })
  }

  /**
   * Выполнить HTTP запрос
   * @param url URL запроса
   * @param options опции запроса
   * @returns промис с ответом
   */
  private async request<T = unknown>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    const { method = "GET", headers = {}, timeout = this.config.timeout, params } = options

    const fullUrl = this.buildUrl(url, params)
    const requestHeaders = { ...this.config.defaultHeaders, ...headers }

    if (this.config.enableLogging) {
      console.log(`[HttpClient] ${method} ${fullUrl}`, { headers: requestHeaders })
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(fullUrl, {
        method,
        headers: requestHeaders,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      const data = await this.parseResponse<T>(response)

      return {
        data,
        status: response.status,
        headers: this.parseHeaders(response.headers),
        url: fullUrl
      }
    } catch (error) {
      if (this.config.enableLogging) {
        console.error(`[HttpClient] Ошибка запроса ${method} ${fullUrl}:`, error)
      }
      throw new Error(this.errorParser.parse(error))
    }
  }

  /**
   * Построить полный URL с параметрами
   * @param url базовый URL
   * @param params параметры запроса
   * @returns полный URL
   */
  private buildUrl(url: string, params?: Record<string, unknown>): string {
    const fullUrl = url.startsWith("http") ? url : `${this.config.baseUrl}${url}`

    if (!params) {
      return fullUrl
    }

    const urlObj = new URL(fullUrl)
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value))
      }
    })

    return urlObj.toString()
  }

  /**
   * Парсить ответ сервера
   * @param response ответ fetch
   * @returns распарсенные данные
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type")

    if (contentType?.includes("application/json")) {
      return await response.json()
    }

    if (contentType?.includes("text/")) {
      return (await response.text()) as T
    }

    return (await response.blob()) as T
  }

  /**
   * Парсить заголовки ответа
   * @param headers заголовки Headers
   * @returns объект с заголовками
   */
  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {}
    headers.forEach((value, key) => {
      result[key] = value
    })
    return result
  }

  /**
   * Отправить GET запрос
   * @param url URL запроса
   * @param options опции запроса
   * @returns промис с ответом
   */
  async get<T = unknown>(url: string, options: Omit<RequestOptions, "method"> = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...options, method: "GET" })
  }

  /**
   * Отправить POST запрос
   * @param url URL запроса
   * @param data данные для отправки
   * @param options опции запроса
   * @returns промис с ответом
   */
  async post<T = unknown>(
    url: string,
    data: unknown = {},
    options: Omit<RequestOptions, "method"> = {}
  ): Promise<HttpResponse<T>> {
    // TODO: Реализовать отправку данных в теле запроса
    console.log("POST data:", data)
    return this.request<T>(url, {
      ...options,
      method: "POST",
      headers: {
        ...options.headers,
        "Content-Type": "application/json"
      }
    })
  }

  /**
   * Отправить PUT запрос
   * @param url URL запроса
   * @param data данные для отправки
   * @param options опции запроса
   * @returns промис с ответом
   */
  async put<T = unknown>(
    url: string,
    data: unknown = {},
    options: Omit<RequestOptions, "method"> = {}
  ): Promise<HttpResponse<T>> {
    // TODO: Реализовать отправку данных в теле запроса
    console.log("PUT data:", data)
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      headers: {
        ...options.headers,
        "Content-Type": "application/json"
      }
    })
  }

  /**
   * Отправить DELETE запрос
   * @param url URL запроса
   * @param options опции запроса
   * @returns промис с ответом
   */
  async delete<T = unknown>(url: string, options: Omit<RequestOptions, "method"> = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...options, method: "DELETE" })
  }

  /**
   * Отправить PATCH запрос
   * @param url URL запроса
   * @param data данные для отправки
   * @param options опции запроса
   * @returns промис с ответом
   */
  async patch<T = unknown>(
    url: string,
    data: unknown = {},
    options: Omit<RequestOptions, "method"> = {}
  ): Promise<HttpResponse<T>> {
    // TODO: Реализовать отправку данных в теле запроса
    console.log("PATCH data:", data)
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
      headers: {
        ...options.headers,
        "Content-Type": "application/json"
      }
    })
  }
}
