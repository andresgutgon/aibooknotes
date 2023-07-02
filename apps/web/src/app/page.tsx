import Image from 'next/image'
import { LoginButton, LogoutButton } from '@/components/Auth/Google'
import { getServerSession } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session?.user ? (
        <div className='flex flex-col space-y-2'>
          <Image className='rounded-full' width={80} height={80} src={session.user.image!} alt={session.user.name!} />
          <LogoutButton />
        </div>
      ) : <LoginButton />}
    </main>
  )
}

