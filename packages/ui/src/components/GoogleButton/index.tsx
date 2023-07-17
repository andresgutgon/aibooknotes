import { Button } from "../Button";
import GoogleLogo from "./GoogleLogo";

type Props = {
  onClick: () => void
  isLoading: boolean
  disabled?: boolean
}
export function GoogleButton({ onClick, isLoading, disabled = false }: Props) {
  return (
    <Button isLoading={isLoading} onClick={onClick} disabled={disabled}>
      <div className='flex items-center space-x-2'>
        {!isLoading && <GoogleLogo />}
        <div>Login with Google</div>
      </div>
    </Button>
  )

}
