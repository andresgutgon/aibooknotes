import api from "@base/lib/api"
import { GoogleButton } from "ui"

type Props = { isLoading: boolean }
export default function GoogleAuth({ isLoading }: Props) {
  const onClick = async () => { api.signIn() }
  return (
    <GoogleButton onClick={onClick} isLoading={isLoading} disabled={isLoading} />
  )
}
