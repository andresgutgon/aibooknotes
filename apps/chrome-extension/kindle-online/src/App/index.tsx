import { ReactNode } from 'react'
import Providers from '@/App/Providers'
import { useCurrentUser } from '@base/stores/currentUser'
import GoogleAuth from '@/components/GoogleAuth'
import Notes from './Screens/Notes'
import Header from '@/components/Header'
import { QueryClient } from '@tanstack/react-query'
import AppSkeleton from '@/components/AppSkeleton'

type AuthorizedProps = { children: ReactNode }
function Authorized({ children }: AuthorizedProps) {
  const { data: user, isLoading } = useCurrentUser()

  if (isLoading) return <AppSkeleton />
  if (!user) return <GoogleAuth />

  return (
    <div className='space-y-2'>
      {user && <Header />}
      {children}
    </div>
  )
}

type Props = { queryClient: QueryClient }
export default function App({ queryClient }: Props) {
  return (
    <Providers queryClient={queryClient}>
      <div className='my-4 mr-4 p-2 flex flex-col gap-y-3 rounded-md border border-gray-100'>
        <Authorized>
          <Notes />
        </Authorized>
      </div>
    </Providers>
  )
}
