import { NextResponse } from "next/server"
import getTrustedDomain from "@/lib/api/trustedDomains"

export function middleware(request: Request) {
  const regex = new RegExp('/api/*')

  if (!regex.test(request.url)) {
    return NextResponse.next()
  }

  const origin = request.headers.get('Origin')
  const referer = request.headers.get('referer')
  const domain = getTrustedDomain(origin, referer)

  if (!domain) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  return NextResponse.next({
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': domain
    }
  })
}

