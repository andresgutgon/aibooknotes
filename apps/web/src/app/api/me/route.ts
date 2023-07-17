import { auth, json } from '@/lib/api'

export async function GET(request: Request, response: Response) {
  return auth(
    request,
    response,
    ({ session }) =>
      json({ request, data: session.user })
  )
}
