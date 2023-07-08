import { ALLOWED_DOMAINS } from './domains'

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
const ALLOWED_METHODS = HTTP_METHODS.join(',')
function cors(headers: Headers, request: Request) {
  headers.set('Access-Control-Allow-Credentials', 'true')
  headers.set('Access-Control-Allow-Methods', ALLOWED_METHODS)
  const origin = request.headers.get('Origin') ?? ''
  if (ALLOWED_DOMAINS.includes(origin)) {
    headers.set(
      'Access-Control-Allow-Origin',
      origin,
    )
  }

  return headers
}

export default function headers(request: Request) {
  const headers = new Headers()
  return cors(headers, request)
}
