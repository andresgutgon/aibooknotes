import { auth, json } from '@/lib/api'

export async function POST(request: Request, response: Response) {
  const body = request.body
  return auth(
    request,
    response,
    () =>
      json({ request, data: { val: 344 } })
  )
}
