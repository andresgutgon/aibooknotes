import "dotenv/config"

import type { Config } from "drizzle-kit"
const DB_URL = process.env.DATABASE_URL

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: `${DB_URL}?ssl={"rejectUnauthorized":true}`
  }
} satisfies Config
