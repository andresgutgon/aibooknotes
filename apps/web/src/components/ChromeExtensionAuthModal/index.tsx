'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { Session } from 'next-auth'

const SUCCESS_URL = '/auth/google/success'

type Props = { session: Session | null | undefined }
export default async function ChromeExtensionAuthModal({ session }: Props) {
  const router = useRouter()
  const isLogedIn = !!session?.user

  useEffect(() => {
    if (isLogedIn) {
      router.push(SUCCESS_URL)
    } else {
      signIn('google', { callbackUrl: SUCCESS_URL })
    }
  }, [isLogedIn])

  return null
}
