import type { Dirent as MemfsDirent } from 'memfs/lib/Dirent'
import type { Volume as MemfsVolume } from 'memfs/lib/volume'
import { DirectoryListingContract, DisksList, DriveListItem, DriverContract } from "./implementation"

export interface FakeDriveListItem extends DriveListItem<MemfsDirent> { }

export interface FakeDriverContract extends DriverContract {
  name: 'fake'
  adapter: MemfsVolume
  disk: keyof DisksList
  makePath(location: string): string
  list(location: string): DirectoryListingContract<this, FakeDriveListItem>
}


export interface FakeDriveContract {
  fakes: Map<keyof DisksList, FakeDriverContract>
  exists(location: string): Promise<boolean>
  get(location: string): Promise<Buffer>
  bytes(location: string): Promise<number>
  isFaked(disk: keyof DisksList): boolean
  use(disk: keyof DisksList): FakeDriverContract
  restore(disk: keyof DisksList): void
}

