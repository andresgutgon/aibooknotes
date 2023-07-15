import { compact } from './utilities'
import { AnyObject, HttpMethod, ApiDataConfig, ApiError, ApiErrorBody } from './types'

type UrlArgs = {
  context: 'api' | 'site',
  path: string,
  params?: AnyObject
}
type ContentTypeHeader = 'json' | 'urlencoded'
type AllowedHeaders = {
  contentType?: ContentTypeHeader
}
type BaseConfig = { params?: AnyObject; headers?: AllowedHeaders }
type VerbArgs<T extends HttpMethod> = T extends 'GET'
  ? BaseConfig : T extends 'DELETE' ? BaseConfig
  : BaseConfig & { data?: ApiDataConfig }
type RequestConfig<T extends HttpMethod> = { path: string } & VerbArgs<T>
type FetchConfig = {
  method: HttpMethod;
  path: string;
  params?: AnyObject;
  data?: ApiDataConfig
  headers?: AllowedHeaders
}
type IClient = {
  clientHostOrigin: string
  apiHost: string
}

export class ApiClient {
  private mode: RequestMode = 'cors'
  private credentials: RequestCredentials = 'include'
  apiDomain: string
  clientHostOrigin: string

  constructor({ clientHostOrigin, apiHost }: IClient) {
    this.clientHostOrigin = clientHostOrigin
    this.apiDomain = apiHost
  }

  url({ context, path, params }: UrlArgs): URL {
    const base = context === 'api' ? `${this.apiDomain}/api` : this.apiDomain
    const url = new URL(`${base}/${path}`)
    const safeParams = compact(params ?? {})
    Object.keys(safeParams).forEach((key) => {
      const value = safeParams[key]
      if (value) {
        url.searchParams.append(key, value.toString())
      }
    })
    return url
  }

  async get<T extends AnyObject>({ path, params = {} }: RequestConfig<'GET'>) {
    return this.fetch<T>({ method: 'GET', path, params })
  }

  async post<T extends AnyObject>({ path, params, data, headers }: RequestConfig<'POST'>) {
    return this.fetch<T>({ method: 'POST', path, params, data, headers })
  }

  async put<T extends AnyObject>({ path, params, data }: RequestConfig<'PUT'>) {
    return this.fetch<T>({ method: 'PUT', path, params, data })
  }

  async rpc<T extends AnyObject>({ path, params, data }: RequestConfig<'POST'>) {
    return this.fetch<T>({ method: 'POST', path, params, data })
  }

  async remove<T extends AnyObject>({ path }: RequestConfig<'DELETE'>) {
    return this.fetch<T>({ method: 'DELETE', path })
  }

  private async fetch<T extends AnyObject>({ method, path, params = {}, headers = {}, data }: FetchConfig): Promise<T> {
    const options = this.options(method, data, headers)
    const response = await window.fetch(
      this.url({ context: 'api', path, params }).href,
      options
    )
    return this.response<T>(response)
  }

  private options(method: HttpMethod, data: AnyObject | FormData = {}, headers: AllowedHeaders): RequestInit {
    const options: RequestInit = {
      method,
      mode: this.mode,
      credentials: this.credentials,
      headers: this.headers(headers, data)
    }

    if (method === 'GET') return options

    return {
      ...options,
      body: this.body(data),
    }
  }

  private async response<T extends AnyObject>(response: Response): Promise<T> {
    if (!response.ok) {
      let json: ApiErrorBody = { errors: [] }

      if (response.status >= 500) {
        json = {
          errors: [{ title: 'API error', detail: response.statusText }],
        }
      } else {
        json = await response.json()
      }

      throw new ApiError(
        response.statusText,
        response.status,
        json
      )
    }

    return response.json()
  }

  private body(data: ApiDataConfig) {
    const isFormData = data instanceof FormData
    const isUrlSearchParams = data instanceof URLSearchParams
    const isJSON = !isFormData && !isUrlSearchParams
    if (isJSON) return JSON.stringify(data)

    if (isUrlSearchParams) return data

    const isEmpty = data.entries().next().done
    return isEmpty ? '' : data
  }

  private headers(allowedHeaders: AllowedHeaders, data?: FormData | AnyObject): HeadersInit {
    const headers = new Headers()
    headers.set('Origin', this.clientHostOrigin)

    const contentType = this.buildContentType(allowedHeaders)

    if (contentType) {
      headers.set('Content-Type', contentType)
    }

    if (data instanceof FormData) return headers

    headers.append('Accept', 'application/json')
    return headers
  }

  private buildContentType(headers: AllowedHeaders) {
    const type = headers.contentType
    if (!type) return null
    if (type === 'urlencoded') return 'application/x-www-form-urlencoded'

    return 'application/json'
  }
}
