import { createHash } from 'crypto'
import { Exception } from '@poppinss/utils'
import { base64, MessageBuilder } from '@poppinss/utils/build/helpers'

import { MessageVerifierContract } from '../typings'
import { Hmac } from './Hmac'

/**
 * Message verifier is similar to the encryption. However, the actual payload
 * is not encrypted and just base64 encoded. This is helpful when you are
 * not concerned about the confidentiality of the data, but just want to
 * make sure that is not tampered after encoding.
 */
export class MessageVerifier implements MessageVerifierContract {
  private cryptoKey = createHash('sha256').update(this.secret).digest()
  private separator = '.'
  constructor(private secret: string) { }

  public sign(value: any, expiresAt?: string | number, purpose?: string) {
    if (value === null || value === undefined) {
      throw new Exception(
        '"MessageVerifier.sign" cannot sign null or undefined values',
        500,
        'E_RUNTIME_EXCEPTION'
      )
    }

    const encoded = base64.urlEncode(new MessageBuilder().build(value, expiresAt, purpose))
    return `${encoded}${this.separator}${new Hmac(this.cryptoKey).generate(encoded)}`
  }

  public unsign<T extends any>(value: string, purpose?: string): null | T {
    if (typeof value !== 'string') {
      throw new Exception(
        '"MessageVerifier.unsign" expects a string value',
        500,
        'E_RUNTIME_EXCEPTION'
      )
    }

    /**
     * Ensure value is in correct format
     */
    const [encoded, hash] = value.split(this.separator)
    if (!encoded || !hash) {
      return null
    }

    /**
     * Ensure value can be decoded
     */
    const decoded = base64.urlDecode(encoded)
    if (!decoded) {
      return null
    }

    const isValid = new Hmac(this.cryptoKey).compare(encoded, hash)
    return isValid ? new MessageBuilder().verify(decoded, purpose) : null
  }
}
