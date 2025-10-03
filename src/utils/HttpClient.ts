import type {
  HttpClientConfig,
  HttpClientResponse,
  HttpClientRequestOptions,
  IHttpClient,
  HttpClientRequestParams,
  HttpClientRequestBody
} from "@types"

/**
 * Ошибка HTTP клиента
 */
export class HttpClientError extends Error {
  /**
   * Имя ошибки
   */
  public name: string = "HttpClientError"

  /**
   * Инициализировать ошибку HTTP клиента
   * @param message сообщение ошибки
   */
  constructor(message: string) {
    super(message)
  }
}

/**
 * Утилита. HTTP клиент
 */
export class HttpClient implements IHttpClient {
  private config: Required<HttpClientConfig>

  /**
   * Инициализировать клиента
   * @param config конфигурация HTTP клиента
   */
  constructor(config: HttpClientConfig) {
    this.config = {
      baseUrl: config.baseUrl,
      headers: {
        "Content-Type": "application/json"
      }
    }
  }

  /**
   * Построить URL с параметрами
   * @param url URL
   * @param params параметры
   */
  private buildUrl(path: string, params: HttpClientRequestParams): string {
    const url = new URL(`${this.config.baseUrl}/${path}`)
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value))
      }
    })

    url.search = searchParams.toString()

    return url.toString()
  }

  /**
   * Выполнить HTTP запрос
   * @param options опции запроса
   */
  async request<T>(options: HttpClientRequestOptions): Promise<HttpClientResponse<T>> {
    const method = options.method || "GET"
    const url = this.buildUrl(options.url, options.params || {})
    const headers = { ...this.config.headers, ...(options.headers || {}) }
    const body = options.data ? JSON.stringify(options.data) : undefined

    try {
      const response = await fetch(url, { method, headers, body })

      return {
        data: await response.json(),
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)

      throw new HttpClientError(message)
    }
  }

  /**
   * Выполнить GET запрос
   * @param url URL
   * @param params параметры
   */
  async get<T>(url: string, params: HttpClientRequestParams): Promise<HttpClientResponse<T>> {
    return this.request<T>({ url, method: "GET", params })
  }

  /**
   * Выполнить POST запрос
   * @param url URL
   * @param data данные
   */
  async post<T>(url: string, data: HttpClientRequestBody): Promise<HttpClientResponse<T>> {
    return this.request<T>({ url, method: "POST", data })
  }

  /**
   * Выполнить PUT запрос
   * @param url URL
   * @param data данные
   */
  async put<T>(url: string, data: HttpClientRequestBody): Promise<HttpClientResponse<T>> {
    return this.request<T>({ url, method: "PUT", data })
  }

  /**
   * Выполнить DELETE запрос
   * @param url URL
   */
  async delete<T>(url: string): Promise<HttpClientResponse<T>> {
    return this.request<T>({ url, method: "DELETE" })
  }

  /**
   * Выполнить PATCH запрос
   * @param url URL
   * @param data данные
   */
  async patch<T>(url: string, data: HttpClientRequestBody): Promise<HttpClientResponse<T>> {
    return this.request<T>({ url, method: "PATCH", data })
  }
}
