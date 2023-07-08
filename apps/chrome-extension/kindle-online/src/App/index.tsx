import { ReactNode } from 'react'
import Providers from '@/App/Providers'
import { useCurrentUser } from '@base/stores/currentUser'
import GoogleAuth from '@/components/GoogleAuth'
import Notes from './Screens/Notes'

type Props = { children: ReactNode }
function Authorized({ children }: Props) {
  const { currentUser, isLoading } = useCurrentUser()
  if (isLoading || !currentUser) return <GoogleAuth isLoading={isLoading} />
  return children
}

export default function App() {
  return (
    <Providers>
      <div className='my-4 mr-4 p-2 flex flex-col gap-y-3 rounded-md border border-gray-100'>
        <Authorized>
          <Notes />
        </Authorized>
      </div>
    </Providers>
  )
}
