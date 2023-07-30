import * as fsExtra from 'fs-extra'

import { DirectoryListingContract, DriveListItem, DriverContract, Visibility } from "./implementation"

export type LocalDriverConfig = {
  driver: 'local'
  visibility: Visibility
  root: string
  serveFiles?: boolean
  basePath?: string
}

export interface LocalDriveListItem extends DriveListItem<fsExtra.Dirent> { }
export interface LocalDriverContract extends DriverContract {
  name: 'local'
  adapter: typeof fsExtra
  makePath(location: string): string
  list(location: string): DirectoryListingContract<this, LocalDriveListItem>
}
