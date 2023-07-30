export interface UrlBuilderContract {
  params(params?: any[] | Record<string, any>): this
  qs(qs?: Record<string, any>): this
  prefixUrl(url: string): this
  make(identifier: string): string
  disableRouteLookup(): this
  makeSigned(
    identifier: string,
    options?: { expiresIn?: string | number; purpose?: string }
  ): string
}

