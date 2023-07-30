import etag from 'etag'
import * as fsExtra from 'fs-extra'
import { dirname } from 'path'
import {
  CannotDeleteFileException,
  CannotGenerateUrlException,
  CannotGetMetaDataException,
  CannotReadFileException,
  CannotWriteFileException
} from '../../Exceptions'
import { LocalFileServer } from './FileServer'
import { PathPrefixer } from './PathPrefixer'

import { ContentHeaders, DriveFileStats, DriverContract, LocalDriverConfig, RouteContract, Visibility } from "../../typings"
import { pipelinePromise } from './utils'

export class LocalDriver implements DriverContract {
  public name: 'local' = 'local'
  public adapter = fsExtra
  private router: RouteContract
  private routeName = LocalFileServer.makeRouteName(this.name)

  private prefixer = PathPrefixer.fromPath(this.config.root)

  constructor(private config: LocalDriverConfig) {
    this.config = config
  }

  public makePath(location: string) {
    return this.prefixer.prefixPath(location)
  }

  // Common DriverContract methods from here
  public async exists(location: string): Promise<boolean> {
    try {
      return await this.adapter.pathExists(this.makePath(location))
    } catch (error) {
      throw CannotGetMetaDataException.invoke(location, 'exists', error)
    }
  }

  public async get(location: string): Promise<Buffer> {
    try {
      return await this.adapter.readFile(this.makePath(location))
    } catch (error) {
      throw CannotReadFileException.invoke(location, error)
    }
  }

  public async getStream(location: string): Promise<NodeJS.ReadableStream> {
    try {
      return this.adapter.createReadStream(this.makePath(location))
    } catch (error) {
      throw CannotReadFileException.invoke(location, error)
    }
  }


  public async getVisibility(_: string): Promise<Visibility> {
    return this.config.visibility
  }

  public async getStats(location: string): Promise<DriveFileStats> {
    try {
      const stats = await this.adapter.stat(this.makePath(location))
      return {
        modified: stats.mtime,
        size: stats.size,
        isFile: stats.isFile(),
        etag: etag(stats),
      }
    } catch (error) {
      throw CannotGetMetaDataException.invoke(location, 'stats', error)
    }
  }

  public async getSignedUrl(
    location: string,
    options?: ContentHeaders & { expiresIn?: string | number }
  ): Promise<string> {
    if (!this.config.serveFiles) {
      throw CannotGenerateUrlException.invoke(location, this.name)
    }

    const { expiresIn, ...qs } = options || {}
    return this.router.makeSignedUrl(
      this.routeName,
      { [LocalFileServer.filePathParamName]: [this.prefixer.normalizePath(location)] },
      {
        expiresIn,
        qs,
      }
    )
  }

  public async getUrl(location: string): Promise<string> {
    if (!this.config.serveFiles) {
      throw CannotGenerateUrlException.invoke(location, this.name)
    }

    return this.router.makeUrl(this.routeName, {
      [LocalFileServer.filePathParamName]: [this.prefixer.normalizePath(location)],
    })
  }

  public async put(location: string, contents: Buffer | string): Promise<void> {
    try {
      await this.adapter.outputFile(this.makePath(location), contents)
    } catch (error) {
      throw CannotWriteFileException.invoke(location, error)
    }
  }

  public async putStream(location: string, contents: NodeJS.ReadableStream): Promise<void> {
    const absolutePath = this.makePath(location)

    const dir = dirname(absolutePath)
    await this.adapter.ensureDir(dir)

    const writeStream = this.adapter.createWriteStream(absolutePath)

    /**
     * If streaming is interrupted, then the destination file will be
     * created with partial or empty contents.
     *
     * Earlier we are cleaning up the empty file, which addresses one
     * use case (no pre-existing file was there).
     *
     * However, in case there was already a file, it will be then emptied
     * out. So basically there is no way to get the original contents
     * back unless we read the existing content in buffer, but then
     * we don't know how large the file is.
     */
    try {
      await pipelinePromise(contents, writeStream)
    } catch (error) {
      throw CannotWriteFileException.invoke(location, error)
    }
  }

  /**
   * Not supported
   */
  public async setVisibility(_: string, __: string): Promise<void> {
    return
  }

  public async delete(location: string): Promise<void> {
    try {
      await this.adapter.remove(this.makePath(location))
    } catch (error) {
      throw CannotDeleteFileException.invoke(location, error)
    }
  }
}
