import { LocalDriver } from '../Drivers'
import { DriveConfig, Disk, DriverContract } from '../typings'


export class Driver {
  private config: DriveConfig
  private driver: DriverContract

  constructor(config: DriveConfig, disk: Disk) {
    this.config = config
    this.driver = this.buildDriver(disk)
  }

  private buildDriver(disk: Disk, config: DriveConfig) {
    const config = this.config.disks[disk]
    switch (disk) {
      case 'local':
        return new LocalDriver(config)
      default:
        throw Error(`Not drive found for disk ${disk}`)
        break;
    }
  }
}
