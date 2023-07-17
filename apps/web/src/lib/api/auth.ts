import { Session } from 'next-auth'
import { ApiErrorBody } from 'core'
import { getServerSession } from '@/lib/auth'
import { json } from './json'

type CallbackFnArgs = { session: Session }
type CallbackFn = (args: CallbackFnArgs) => Response
export async function auth(request: Request, _res: Response, callback: CallbackFn) {
  const session = await getServerSession()
  if (!session) {
    return json<ApiErrorBody>({
      request,
      data: {
        errors: [
          {
            title: 'Unauthorized access',
            detail: 'You need to login'
          }
        ]
      },
      status: 401
    })
  }

  return callback({ session })
}
