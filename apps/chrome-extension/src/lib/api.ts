import { ApiClient } from 'core'
import { env } from '@base/env'

const api = new ApiClient({
  clientHostOrigin: window.location.origin,
  apiHost: env.VITE_API_HOST
})
export default api
