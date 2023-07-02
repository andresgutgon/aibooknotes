'use client'
import { signIn, signOut } from "next-auth/react"
import { GoogleButton, Button } from "ui"

export function LoginButton() {
  const onClick = () => {
    signIn('google')
  }
  return <GoogleButton onClick={onClick} />
}

export function LogoutButton() {
  const onClick = () => {
    signOut()
  }
  return <Button onClick={onClick}>Log out</Button>
}
