export type MakeUrlOptions = {
  qs?: Record<string, any>
  domain?: string
  prefixUrl?: string
  disableRouteLookup?: boolean
} & Record<string, any>

export type MakeSignedUrlOptions = MakeUrlOptions & {
  expiresIn?: string | number
  purpose?: string
}

export interface RouteContract {
  makeUrl(
    routeIdentifier: string,
    params?: any[] | MakeUrlOptions,
    options?: MakeUrlOptions
  ): string

  makeSignedUrl(
    routeIdentifier: string,
    params?: any[] | MakeSignedUrlOptions,
    options?: MakeSignedUrlOptions
  ): string
}
