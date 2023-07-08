export type AnyObject = Record<string, unknown>
type ApiErrorItem = { title: string; detail: string }
export type ApiErrorBody = {
  errors: ApiErrorItem[]
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type ApiDataConfig = AnyObject | FormData
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public json: ApiErrorBody
  ) {
    super(message)
  }
}
