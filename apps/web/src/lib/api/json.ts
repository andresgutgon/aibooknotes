import { NextResponse } from 'next/server'
import { AnyObject } from "core"

type Args<T extends AnyObject> = {
  request: Request
  data: T
  status?: number
}
export function json<T extends AnyObject>({ request, data, status = 200 }: Args<T>): NextResponse {
  return NextResponse.json<T>(data, {
    status
  })
}
