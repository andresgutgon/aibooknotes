import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectRequest
} from '@aws-sdk/client-s3'
import s3Client from '@/lib/aws/s3Client'
import { env } from '@/env.mjs'

export enum NamespaceKey {
  books = 'books',
  users = 'users'
}
export type Namespace = {
  key: NamespaceKey,
  namespaceId: string
}
type BuildKey = { namespace: Namespace; filename: string }
function buildKey({ namespace: { key, namespaceId }, filename }: BuildKey): string {
  return `${key}/${namespaceId}/${filename}`
}

type FileContent = PutObjectRequest['Body'] | string | Uint8Array | Buffer
type BuildParams = {
  namespace: Namespace
  filename: string
  fileContent: FileContent
}
function buildParams({ namespace, filename, fileContent }: BuildParams): PutObjectCommandInput {
  const key = buildKey({ namespace, filename })
  return {
    Bucket: env.BUCKET_NAME,
    Key: key,
    Body: fileContent
  }
}

export type Params = {
  namespace: Namespace
  filename: string
  fileContent: FileContent
}
type UploadResult = {
  success: boolean
  fileIdentifier: string
}
export default async function upload(params: Params): Promise<UploadResult> {
  let result = { success: false, fileIdentifier: '' }
  const uploadParams = buildParams({
    namespace: params.namespace,
    filename: params.filename,
    fileContent: params.fileContent
  })
  const command = new PutObjectCommand(uploadParams)
  try {
    const response = await s3Client.send(command)
    const status = response.$metadata ? response.$metadata.httpStatusCode : null
    if (status && status < 300 && uploadParams.Key) {
      result = { success: true, fileIdentifier: uploadParams.Key }
    }
  } catch (e) { }

  return result
}
