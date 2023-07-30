import { LocalDriverConfig, LocalDriverContract } from "./drivers"


export interface DriversList {
  local: {
    driver: LocalDriverContract
    config: LocalDriverConfig
  }
}
export type DriveConfig = {
  disks: {
    [name: string]: {
      [K in keyof DriversList]: DriversList[K]['config'] & { driver: K }
    }[keyof DriversList]
  }
}

export type Disk = keyof DriveConfig['disks']

export type InferDisksFromConfig<T extends DriveConfig> = {
  [K in keyof T['disks']]: DriversList[T['disks'][K]['driver']]
}
