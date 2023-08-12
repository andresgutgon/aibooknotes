import { createHmac } from 'crypto'
import { base64, safeEqual } from '@poppinss/utils/build/helpers'

/**
 * A generic class for generating SHA-256 Hmac for verifying the value
 * integrity.
 */
export class Hmac {
  constructor(private key: Buffer) { }

  public generate(value: string) {
    return base64.urlEncode(createHmac('sha256', this.key).update(value).digest())
  }

  public compare(value: string, existingHmac: string) {
    return safeEqual(this.generate(value), existingHmac)
  }
}
