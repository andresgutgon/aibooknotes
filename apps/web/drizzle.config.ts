import { env } from "@/env.mjs"
import "dotenv/config"

import type { Config } from "drizzle-kit"
const HOST = env.DATABASE_HOST
const USER = env.DATABASE_USERNAME
const PWD = env.DATABASE_PASSWORD
const safeChek = 'ssl={"rejectUnauthorized":true}'
const url = `mysql://${USER}:${PWD}@${HOST}?${safeChek}`

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: url
  }
} satisfies Config
