import { MakeSignedUrlOptions, MakeUrlOptions, RouteContract } from "../typings";

export class Router implements RouteContract {
  public makeSignedUrl(
    routeIdentifier: string,
    params?: any[] | MakeSignedUrlOptions,
    options?: MakeSignedUrlOptions
  ): string {
    const normalizedOptions = this.normalizeMakeSignedUrlOptions(params, options)
    const builder = this.builder(normalizedOptions.domain)

    normalizedOptions.params && builder.params(normalizedOptions.params)
    normalizedOptions.qs && builder.qs(normalizedOptions.qs)
    normalizedOptions.prefixUrl && builder.prefixUrl(normalizedOptions.prefixUrl)

    return builder.makeSigned(routeIdentifier, normalizedOptions)
  }

  private builder(domain: string | undefined) {
    return new UrlBuilder(this.encryption, domain)
  }


  private normalizeMakeSignedUrlOptions(
    params?: any[] | MakeSignedUrlOptions,
    options?: MakeSignedUrlOptions
  ) {
    /**
     * Params used to be options earlier. So we are checking a few properties of it
     */
    params = params || {}
    options = options || {}

    const normalizedParams = params['params'] ? params['params'] : params
    const qs = options.qs || params['qs']
    const expiresIn = options.expiresIn || params['expiresIn']
    const purpose = options.purpose || params['purpose']
    const domain = options.domain
    const prefixUrl = options.prefixUrl

    return {
      params: normalizedParams,
      qs,
      domain,
      prefixUrl,
      expiresIn,
      purpose
    }
  }

  private normalizeMakeUrlOptions(params?: any[] | MakeUrlOptions, options?: MakeUrlOptions) {
    params = params || {}
    options = options || {}

    const normalizedParams = params['params'] ? params['params'] : params
    const qs = options.qs || params['qs']
    const domain = options.domain
    const prefixUrl = options.prefixUrl

    return {
      params: normalizedParams,
      qs,
      domain,
      prefixUrl,
    }
  }

}
