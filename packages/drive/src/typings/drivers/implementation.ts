export interface DisksList { }
export type ContentHeaders = {
  contentType?: string
  contentLanguage?: string
  contentEncoding?: string
  contentDisposition?: string
  cacheControl?: string
  contentLength?: string | number
}

export type WriteOptions = {
  visibility?: string
} & ContentHeaders &
  Record<string, any>
export type Visibility = 'public' | 'private'
export type DriveFileStats = {
  size: number
  modified: Date
  isFile: boolean
  etag?: string
}

export interface DriverContract {
  name: string

  exists(location: string): Promise<boolean>
  get(location: string): Promise<Buffer>
  getStream(location: string): Promise<NodeJS.ReadableStream>
  getVisibility(location: string): Promise<Visibility>
  getStats(location: string): Promise<DriveFileStats>
  getSignedUrl(
    location: string,
    options?: ContentHeaders & { expiresIn?: string | number }
  ): Promise<string>
  getUrl(location: string): Promise<string>
  put(
    location: string,
    contents: Buffer | string,
    options?: WriteOptions
  ): Promise<void>
  putStream(
    location: string,
    contents: NodeJS.ReadableStream,
    options?: WriteOptions
  ): Promise<void>
  setVisibility(location: string, visibility: Visibility): Promise<void>
  delete(location: string): Promise<void>
  copy(source: string, destination: string, options?: WriteOptions): Promise<void>
  move(source: string, destination: string, options?: WriteOptions): Promise<void>
}

