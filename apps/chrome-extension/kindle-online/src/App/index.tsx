import { ReactNode, useState } from 'react'
import Providers from '@/App/Providers'
import { useCurrentUser } from '@base/stores/currentUser'
import GoogleAuth from '@/components/GoogleAuth'
import Notes from './Screens/Notes'
import Header from '@/components/Header'
import { QueryClient } from '@tanstack/react-query'
import AppSkeleton from '@/components/AppSkeleton'
import { Button } from 'ui'
import api from '@base/lib/api'

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

type DummyResult = { val: number }
function DummyButton() {
  const [dummyResult, setResult] = useState<number>()
  const [isFetching, setFetching] = useState(false)
  const [hasError, setHasError] = useState(false)
  const onClick = async () => {
    setFetching(true)
    let data
    try {
      data = await api.post<DummyResult>({ path: 'dummyPost', data: { val: 33 } })
      setHasError(false)
    } catch (error) {
      setHasError(true)
    }
    if (data) {
      setResult(data.val)
    }
    setFetching(false)
  }

  return (
    <Button
      onClick={onClick}
      variant={hasError ? 'destructive' : 'outline'}
      isLoading={isFetching}
    >
      {hasError ? 'Upps!' :
        `Dummy POST${dummyResult ? `: ${dummyResult}` : null}`
      }
    </Button>
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
        <DummyButton />
      </div>
    </Providers>
  )
}
