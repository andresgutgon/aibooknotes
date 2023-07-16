import { useCurrentUser } from "@base/stores/currentUser"
import { Button } from "ui"
import api from '@base/lib/api'
import { useQueryClient } from "@tanstack/react-query"

export default function Header() {
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()
  const image = user?.image
  const name = user?.name
  const onClick = async () => {
    await api.signOut()
    queryClient.setQueriesData([], null)

  }
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
