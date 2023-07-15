'use client'

import { useState } from "react"
import { signIn, signOut } from "next-auth/react"
import { GoogleButton, Button } from "ui"

export function LoginButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onClick = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      // TODO: Implement toast from shadui
      // toast({
      //   title: 'Error',
      //   description: 'There was an error logging in with Google',
      //   variant: 'destructive',
      // })
    } finally {
      setIsLoading(false)
    }
  }
  return <GoogleButton onClick={onClick} isLoading={isLoading} />
}

export function LogoutButton() {
  const onClick = async () => {
    signOut()
  }
  return <Button onClick={onClick}>Log out</Button>
}
