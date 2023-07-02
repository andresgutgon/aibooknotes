import { type GetServerSidePropsContext } from "next"
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/env.mjs"
import { db } from '@/db'
import { PlanetScaleAdapter } from "@/lib/auth/planetScaleAdapter"
import { Adapter } from "next-auth/adapters"
import { UserSession } from "@/lib/auth"

/**
 * Google docs
 * https://next-auth.js.org/providers/google#configuration
 * https://console.cloud.google.com/apis/credentials?project=project-id-2881036597464125906
 */

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserSession
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  adapter: PlanetScaleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
