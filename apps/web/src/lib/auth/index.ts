import { getServerSession as getNextAuthServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth/config"
import { DefaultSession } from "next-auth"

export type AuthSession = DefaultSession['user'] & {
  id: string
}
export async function getServerSession() {
  let session

  try {
    const [sessionRes] = await Promise.allSettled([
      getNextAuthServerSession(authOptions)
    ])

    if (sessionRes.status === "fulfilled") {
      session = sessionRes.value
    } else {
      console.error(sessionRes)
    }
  } catch (error) {
    console.error(error)
  }

  return session
}

