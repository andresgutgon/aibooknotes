import { getServerSession } from '@/lib/auth'
import ChromeExtensionAuthModal from '@/components/ChromeExtensionAuthModal'

export default async function GoogleAuth() {
  const session = await getServerSession()

  return <ChromeExtensionAuthModal session={session} />
}
