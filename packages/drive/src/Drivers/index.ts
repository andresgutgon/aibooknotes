import { LocalDriver } from './LocalDriver'
import { DriveConfig, Disk, DriverContract } from '../typings'

// TODO: Implement DriverContract
//
export class Driver implements DriverContract {
  private driver: DriverContract

  constructor(config: DriveConfig, disk: Disk) {
    this.driver = this.buildDriver(disk, config)
  }

  private buildDriver(disk: Disk, config: DriveConfig) {
    switch (disk) {
      case 'local':
        return new LocalDriver(config)
      default:
        throw Error(`Not drive found for disk ${disk}`)
        break;
    }
  }
}
