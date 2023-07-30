import qs from 'qs'
import encodeurl from 'encodeurl'

import { EncryptionContract, UrlBuilderContract } from '../typings'

export class UrlBuilder implements UrlBuilderContract {
  private routeParams: any[] | Record<string, any>
  private queryString: Record<string, any> = {}
  private baseUrl: string

  constructor(private encryption: EncryptionContract) { }
  private suffixQueryString(url: string): string {
    if (this.queryString) {
      const encoded = qs.stringify(this.queryString)
      url = encoded ? `${url}?${encodeurl(encoded)}` : url
    }

    return url
  }

  public prefixUrl(url: string): this {
    this.baseUrl = url
    return this
  }

  public qs(queryString?: Record<string, any>): this {
    if (!queryString) return this

    this.queryString = queryString
    return this
  }

  public params(params?: any[] | Record<string, any>): this {
    if (!params) {
      return this
    }

    this.routeParams = params
    return this
  }

  public makeSigned(
    identifier: string,
    options?: { expiresIn?: string | number; purpose?: string }
  ) {
    let url: string

    const signature = this.encryption.verifier.sign(
      this.suffixQueryString(url),
      options?.expiresIn,
      options?.purpose
    )

    Object.assign(this.queryString, { signature })

    return this.suffixQueryString(this.baseUrl ? `${this.baseUrl}${url}` : url)
  }
}

