import { auth, json } from '@/lib/api'

// This will be a dummy S3 upload playground
export async function POST(request: Request, response: Response) {
  const { val } = await request.json()
  const rand = Math.floor(Math.random() * (10 - 1 + 1)) + 1
  return auth(
    request,
    response,
    () =>
      json({ request, data: { val: rand + val } })
  )
}
