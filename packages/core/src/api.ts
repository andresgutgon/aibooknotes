import { compact } from './utilities'
import { AnyObject, HttpMethod, ApiDataConfig, ApiError, ApiErrorBody } from './types'

type QueryParams = { params?: AnyObject }
type VerbArgs<T extends HttpMethod> = T extends 'GET'
  ? QueryParams : T extends 'DELETE' ? QueryParams
  : QueryParams & { data: ApiDataConfig }
type RequestConfig<T extends HttpMethod> = { path: string } & VerbArgs<T>
type FetchConfig = { method: HttpMethod; path: string; params?: AnyObject; data?: ApiDataConfig }
type IClient = {
  clientHostOrigin: string
  apiHost: string
}

export class ApiClient {
  private host: string
  private mode: RequestMode = 'cors'
  private credentials: RequestCredentials = 'include'
  private clientHostOrigin: string

  constructor({ clientHostOrigin, apiHost }: IClient) {
    this.clientHostOrigin = clientHostOrigin
    this.host = `${apiHost}/api`
  }

  async get<T extends AnyObject>({ path, params = {} }: RequestConfig<'GET'>) {
    return this.fetch<T>({ method: 'GET', path, params })
  }

  async post<T extends AnyObject>({ path, params, data }: RequestConfig<'POST'>) {
    return this.fetch<T>({ method: 'POST', path, params, data })
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

  private async fetch<T extends AnyObject>({ method, path, params = {}, data }: FetchConfig): Promise<T> {
    const options = this.options(method, data)
    const response = await window.fetch(
      this.url(path, params).href,
      options
    )
    return this.response<T>(response)
  }

  private url(path: string, params: AnyObject = {}) {
    const url = new URL(`${this.host}/${path}`)
    const safeParams = compact(params)
    Object.keys(safeParams).forEach((key) => {
      const value = safeParams[key]
      if (value) {
        url.searchParams.append(key, value.toString())
      }
    })
    return url
  }

  private options(method: HttpMethod, data: AnyObject | FormData = {}): RequestInit {
    const options: RequestInit = {
      method,
      mode: this.mode,
      credentials: this.credentials,
      headers: this.headers(data)
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

  private body(data: FormData | AnyObject) {
    const isFormData = data instanceof FormData
    if (!isFormData) return JSON.stringify(data)

    const isEmpty = data.entries().next().done
    return isEmpty ? '' : data
  }

  private headers(data?: FormData | AnyObject): HeadersInit {
    const headers = new Headers()
    headers.set('Origin', this.clientHostOrigin)

    if (data instanceof FormData) return headers

    headers.append('Accept', 'application/json')
    return headers
  }
}
