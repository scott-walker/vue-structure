/**
 * Конфигурация утилит
 */
export interface UtilsConfig {
  httpClient: HttpClientConfig
  localStorage: LocalStorageConfig
}

/**
 * API утилит
 */
export interface UtilsApi {
  httpClient: IHttpClient
  localStorage: ILocalStorage
}

/**
 * Конфигурация HTTP клиента
 * @param baseUrl базовый URL для запросов
 * @param headers заголовки по умолчанию
 */
export interface HttpClientConfig {
  baseUrl: string
  headers?: HttpClientRequestHeaders
}

/**
 * Метод HTTP запроса
 */
export type HttpClientMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

/**
 * Параметры HTTP запроса
 */
export type HttpClientRequestParams = Record<string, unknown>

/**
 * Заголовки HTTP запроса
 */
export type HttpClientRequestHeaders = Record<string, string>

/**
 * Тело HTTP запроса
 */
export type HttpClientRequestBody = Record<string, unknown>

/**
 * Опции HTTP запроса
 * @param url URL
 * @param method метод
 * @param headers заголовки
 * @param params параметры
 */
export interface HttpClientRequestOptions {
  url: string
  method?: HttpClientMethod
  headers?: HttpClientRequestHeaders
  params?: HttpClientRequestParams
  data?: HttpClientRequestBody
}

/**
 * Ответ HTTP запроса
 */
export interface HttpClientResponse<T = unknown> {
  data: T
  status: number
  headers: HttpClientRequestHeaders
}

/**
 * Интерфейс HTTP клиента
 * @param get GET запрос
 * @param post POST запрос
 * @param put PUT запрос
 * @param delete DELETE запрос
 * @param patch PATCH запрос
 */
export interface IHttpClient {
  request<T = unknown>(options: HttpClientRequestOptions): Promise<HttpClientResponse<T>>
  get<T = unknown>(
    url: string,
    params?: HttpClientRequestParams,
    options?: HttpClientRequestOptions
  ): Promise<HttpClientResponse<T>>
  post<T = unknown>(
    url: string,
    data?: HttpClientRequestBody,
    options?: HttpClientRequestOptions
  ): Promise<HttpClientResponse<T>>
  put<T = unknown>(
    url: string,
    data?: HttpClientRequestBody,
    options?: HttpClientRequestOptions
  ): Promise<HttpClientResponse<T>>
  patch<T = unknown>(
    url: string,
    data?: HttpClientRequestBody,
    options?: HttpClientRequestOptions
  ): Promise<HttpClientResponse<T>>
  delete<T = unknown>(
    url: string,
    params?: HttpClientRequestParams,
    options?: HttpClientRequestOptions
  ): Promise<HttpClientResponse<T>>
}

/**
 * Конфигурация локального хранилища
 * @param storageKey ключ для хранения данных в localStorage
 */
export interface LocalStorageConfig {
  storageKey?: string
}

/**
 * Интерфейс локального хранилища
 * @param set установить значение
 * @param get получить значение
 * @param remove удалить значение
 * @param clear очистить все значения
 * @param has проверить существование ключа в хранилище
 */
export interface ILocalStorage {
  set(key: string, value: unknown): void
  get<T = unknown>(key: string, defaultValue?: T): T | null
  remove(key: string): void
  clear(): void
  has(key: string): boolean
}
