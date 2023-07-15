import { ApiClient } from 'core'
import { env } from '@base/env'

class Api extends ApiClient {
  async signIn() {
    window.open(
      this.signInUrl(),
      '_blank',
      'popup=1,left=100,top=100,width=450,height=500'
    )
  }

  async signOut() {
    await this.post({
      path: 'auth/signout',
      headers: { contentType: 'urlencoded' },
      data: await this.authBody()
    })
    window.location.reload()
  }

  private async authBody(): Promise<URLSearchParams> {
    const csrfToken = await this.csrfToken()
    // @ts-expect-error
    return new URLSearchParams({
      csrfToken,
      callbackUrl: this.clientHostOrigin,
      json: true,
    })
  }

  private async csrfToken(): Promise<string> {
    const { csrfToken } = await this.get({ path: 'auth/csrf' })
    return csrfToken as string
  }

  private signInUrl() {
    return this.url(
      {
        context: 'site',
        path: 'auth/google'
      }
    ).href
  }
}

const api = new Api({
  clientHostOrigin: window.location.origin,
  apiHost: env.VITE_API_HOST
})

export default api
