import { ApiClient } from 'core'

const clientHostOrigin = process.env.NEXT_PUBLIC_NEXTAUTH_URL!
const api = new ApiClient({
  clientHostOrigin,
  apiHost: clientHostOrigin
})

export default api
