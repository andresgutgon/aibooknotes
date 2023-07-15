import { useCurrentUser } from "@base/stores/currentUser"
import { Button } from "ui"
import api from '@base/lib/api'

export default function Header() {
  const { currentUser } = useCurrentUser()
  const image = currentUser?.image
  const name = currentUser?.name
  const onClick = async () => { api.signOut() }
  return (
    <div className='flex justify-between'>
      {/* TODO: logo */}
      <div />
      <div className='flex items-center space-x-2'>
        <span>{name}</span>
        {image && (
          <img className='rounded-full' src={image} width={40} height={40} alt={name} />
        )}
        <Button onClick={onClick}>Logout</Button>
      </div>
    </div>
  )
}
