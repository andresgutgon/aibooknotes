import { LocalDriverConfig, LocalDriverContract } from "./typings"

export interface DriversList {
  local: {
    implementation: LocalDriverContract
    config: LocalDriverConfig
  }
}
type DriveConfig = {
  disks: {
    [name: string]: {
      [K in keyof DriversList]: DriversList[K]['config'] & { driver: K }
    }[keyof DriversList]
  }
}

export function driveConfig<T extends DriveConfig & { disk: keyof T['disks'] }>(config: T): T {
  return config
}

export type InferDisksFromConfig<T extends DriveConfig> = {
  [K in keyof T['disks']]: DriversList[T['disks'][K]['driver']]
}
