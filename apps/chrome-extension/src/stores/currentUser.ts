import { useQuery } from '@tanstack/react-query'

import api from '@base/lib/api'

export type CurrentUser = {
  id: number
  email: string
  name: string
  image?: string
}

const ME_PATH = 'me'
export const ME_QUERY = [ME_PATH]

export function useCurrentUser() {
  const { data: currentUser, ...rest } = useQuery<CurrentUser>({
    queryKey: ME_QUERY,
    queryFn: () => api.get<CurrentUser>({ path: ME_PATH }),
    retry: false
  })

  return { currentUser, ...rest }
}
