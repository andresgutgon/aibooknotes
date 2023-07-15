import { ReactNode } from 'react'
import Providers from '@/App/Providers'
import { useCurrentUser } from '@base/stores/currentUser'
import GoogleAuth from '@/components/GoogleAuth'
import Notes from './Screens/Notes'
import Header from '@/components/Header'
import { QueryClient } from '@tanstack/react-query'

type AuthorizedProps = { children: ReactNode }
function Authorized({ children }: AuthorizedProps) {
  const { currentUser, isLoading } = useCurrentUser()

  if (isLoading || !currentUser) return <GoogleAuth isLoading={isLoading} />

  return (
    <div className='space-y-2'>
      <Header />
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
