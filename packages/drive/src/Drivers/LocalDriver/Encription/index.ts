import { Exception } from '@poppinss/utils'
import { createHash, createCipheriv, createDecipheriv } from 'crypto'
import { base64 as utilsBase64, MessageBuilder, string } from '@poppinss/utils/build/helpers'
import { EncryptionOptions, EncryptionContract } from '../typings'

import { Hmac } from './Hmac'
import { MessageVerifier } from './MessageVerifier'
import { DriveKeyException } from '../Exceptions'

export class Encryption implements EncryptionContract {
  /**
   * The key for signing and encrypting values. It is derived
   * from the user provided secret.
   */
  private cryptoKey: Buffer

  /**
   * Use `dot` as a separator for joining encrypted value, iv and the
   * hmac hash. The idea is borrowed from JWT's in which each part
   * of the payload is concatenated with a dot.
   */
  private separator = '.'
  public verifier: MessageVerifier
  public base64: typeof utilsBase64 = utilsBase64
  public algorithm = this.options.algorithm || 'aes-256-cbc'

  constructor(private options: EncryptionOptions) {
    this.validateSecret()
    this.cryptoKey = createHash('sha256').update(this.options.secret).digest()
    this.verifier = new MessageVerifier(this.options.secret)
  }

  private validateSecret() {
    if (typeof this.options.secret !== 'string') {
      throw DriveKeyException.missingKey()
    }

    if (this.options.secret.length < 16) {
      throw DriveKeyException.insecureKey()
    }
  }

  public encrypt(value: any, expiresAt?: string | number, purpose?: string) {
    const iv = string.generateRandom(16)
    const cipher = createCipheriv(this.algorithm, this.cryptoKey, iv)
    const encodedValue = new MessageBuilder().build(value, expiresAt, purpose)
    const encrypted = Buffer.concat([
      cipher.update(encodedValue, 'utf-8'),
      cipher.final()
    ])

    const result = `${this.base64.urlEncode(encrypted)}${this.separator}${this.base64.urlEncode(
      iv
    )}`

    return `${result}${this.separator}${new Hmac(this.cryptoKey).generate(result)}`
  }

  /**
   * Decrypt value and verify it against a purpose
   */
  public decrypt<T extends any>(value: string, purpose?: string): T | null {
    if (typeof value !== 'string') {
      throw new Exception(
        '"Encryption.decrypt" expects a string value',
        500,
        'E_RUNTIME_EXCEPTION'
      )
    }

    /**
     * Make sure the encrypted value is in correct format. ie
     * [encrypted value]--[iv]--[hash]
     */
    const [encryptedEncoded, ivEncoded, hash] = value.split(this.separator)
    if (!encryptedEncoded || !ivEncoded || !hash) {
      return null
    }

    /**
     * Make sure we are able to urlDecode the encrypted value
     */
    const encrypted = this.base64.urlDecode(encryptedEncoded, 'base64')
    if (!encrypted) {
      return null
    }

    /**
     * Make sure we are able to urlDecode the iv
     */
    const iv = this.base64.urlDecode(ivEncoded)
    if (!iv) {
      return null
    }

    /**
     * Make sure the hash is correct, it means the first 2 parts of the
     * string are not tampered.
     */
    const isValidHmac = new Hmac(this.cryptoKey).compare(
      `${encryptedEncoded}${this.separator}${ivEncoded}`,
      hash
    )

    if (!isValidHmac) {
      return null
    }

    /**
     * The Decipher can raise exceptions with malformed input, so we wrap it
     * to avoid leaking sensitive information
     */
    try {
      const decipher = createDecipheriv(this.algorithm, this.cryptoKey, iv)
      const decrypted = decipher.update(encrypted, 'base64', 'utf8') + decipher.final('utf8')
      return new MessageBuilder().verify(decrypted, purpose)
    } catch (error) {
      return null
    }
  }

  /**
   * Returns a new instance of encryption with custom secret key
   */
  public child(options: EncryptionOptions) {
    return new Encryption(options)
  }
}
