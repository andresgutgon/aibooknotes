import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import { env } from '@/env.mjs'

// In ./drizzle.config.ts is used other query param for being able
// to `pnpm db:push` from dev machine
export const DB_SSL_URL = `${env.DATABASE_URL}?sslaccept=strict`
const connection = connect({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD
})

export const db = drizzle(connection)
export type DbClient = typeof db
