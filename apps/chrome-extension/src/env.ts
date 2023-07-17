import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_API_HOST: z.string()
  },
  runtimeEnv: import.meta.env
})
