import { Button } from "../Button";
import GoogleLogo from "./GoogleLogo";

type Props = {
  onClick: () => void
  isLoading: boolean
}
export function GoogleButton({ onClick, isLoading }: Props) {
  return (
    <Button isLoading={isLoading} onClick={onClick}>
      <div className='flex items-center space-x-2'>
        {!isLoading && <GoogleLogo />}
        <div>Login with Google</div>
      </div>
    </Button>
  )

}
