import { env } from "@/env.mjs";

/**
 * NOTE: Referer comes with a `/` at the end sometimes
 */
function addSlash(domain: string): string[] {
  return [domain, `${domain}/`]
}

const KIND_ONLINE_DOMAINS = [
  'https://leer.amazon.es',
  'https://read.amazon.com',
  'https://read.amazon.co.uk',
  'https://lire.amazon.fr',
  'https://lesen.amazon.de',
]

const TRUSTED_DOMAINS = [
  ...KIND_ONLINE_DOMAINS,
  ...addSlash(env.NEXTAUTH_URL),
  ...addSlash(env.NEXTAUTH_URL_INTERNAL),
  ...addSlash('https://accounts.google.com')
]

/**
 * Check origin/referer to allow CORS on external
 * domains like Kindle online
 */
export default function getTrustedDomain(origin: string | null, referer: string | null): string | null {
  const refUrl = referer ? new URL(referer) : null

  if (!origin && !refUrl) return null

  const refHost = `${refUrl!.protocol}//${refUrl!.host}`
  const domain = origin || refHost
  const isTrusted = TRUSTED_DOMAINS.includes(domain)
  if (!isTrusted) return null

  return domain
}
