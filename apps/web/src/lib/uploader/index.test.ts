import { describe, expect, it } from 'vitest'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { nanoid } from 'nanoid'
import fs from 'fs'
import path from 'path'
import { mockClient } from 'aws-sdk-client-mock'
import upload, { NamespaceKey } from './index'
import type { Params } from './index'

const s3Mock = mockClient(S3Client)
const REGEXP_BOOK = /books\/book-.+\/the-litle-book-stoicism-.+/
const bookPath = path.resolve(
  __dirname, './book-cover.jpg'
)
let file = fs.createReadStream(bookPath)

let params: Params = {
  namespace: {
    key: NamespaceKey.books,
    namespaceId: `book-${nanoid()}`
  },
  filename: `the-litle-book-stoicism-${nanoid()}.jpg`,
  fileContent: file
}

it('gets file identifier', async () => {
  s3Mock.on(PutObjectCommand).resolves({
    '$metadata': {
      httpStatusCode: 200
    }
  })
  const { fileIdentifier } = await upload(params)
  const hasFile = REGEXP_BOOK.test(fileIdentifier)

  expect(hasFile).to.be.true
})

it('fails when S3 rejects upload', async () => {
  s3Mock.on(PutObjectCommand).rejects()
  const { success } = await upload(params)

  expect(success).to.be.false
})
