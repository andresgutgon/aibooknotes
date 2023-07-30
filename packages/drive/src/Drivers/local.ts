import etag from 'etag'
import * as fsExtra from 'fs-extra'
import { dirname } from 'path'

import { Disk, DriverContract, LocalDriverConfig } from "../typings"

export class LocalDriver implements DriverContract {
  public name: 'local' = 'local'
  public adapter = fsExtra

  private prefixer = PathPrefixer.fromPath(this.config.root)

  constructor(private config: LocalDriverConfig) {
    this.config = config
  }

  public makePath(location: string) {
    return this.prefixer.prefixPath(location)
  }

}
