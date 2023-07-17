import { ApiClient } from 'core'
import { env } from '@base/env'

const DIMENSIONS = { width: 450, height: 500 }
type CenterProps = { width: number; height: number }
function centerPopup({ width, height }: CenterProps) {
  const screenX = typeof window.screenX !== 'undefined' ? window.screenX : window.screenLeft
  const screenY = typeof window.screenY !== 'undefined' ? window.screenY : window.screenTop
  const sWidth = window.innerWidth || document.documentElement.clientWidth || screen.width
  const sHeight = window.innerHeight || document.documentElement.clientHeight || screen.height

  return {
    left: screenX + (sWidth - width) / 2,
    top: screenY + (sHeight - height) / 2
  }
}

class Api extends ApiClient {
  async signIn(onClose: () => void) {
    const { width, height } = DIMENSIONS
    const { left, top } = centerPopup({ width, height })
    const popup = window.open(
      this.signInUrl(),
      '_blank',
      `popup=1,left=${left},top=${top},width=${width},height=${height}`
    )
    const timer = setInterval(function() {
      if (!popup) return

      if (popup.closed) {
        clearInterval(timer)
        onClose()
      }
    }, 1000)
  }

  async signOut() {
    return this.post({
      path: 'auth/signout',
      headers: { contentType: 'urlencoded' },
      data: await this.authBody()
    })
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
