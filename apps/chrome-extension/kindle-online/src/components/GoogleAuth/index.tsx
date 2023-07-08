import { GoogleButton } from "ui"
import api from '@base/lib/api'
import { CurrentUser } from "@base/stores/currentUser"

type Props = { isLoading: boolean }
export default function GoogleAuth({ isLoading }: Props) {
  const onClick = async () => {
    // FIXME: open a chrome.tab or something like that
    // with the Next Auth Google auth callback
    const me = await api.get<CurrentUser>({ path: 'me' })
    console.log('ME', me);
  }

  return (
    <GoogleButton onClick={onClick} isLoading={isLoading} disabled={isLoading} />
  )
}
