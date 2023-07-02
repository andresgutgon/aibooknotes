import { Button } from "../Button";
import GoogleLogo from "./GoogleLogo";

type Props = {
  onClick: () => void
}
export function GoogleButton({ onClick }: Props) {
  return (
    <Button variant='outline' onClick={onClick}>
      <div className='flex items-center space-x-2'>
        <GoogleLogo />
        <div>Login with Google</div>
      </div>
    </Button>
  )

}
