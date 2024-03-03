import { Song } from '@/types/types'
import usePlayer from './usePlayer'
import useAuthModal from './useAuthModal'
import { useUser } from './useUser'

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer()
  const { onOpen } = useAuthModal()
  const { user, isLoading } = useUser()

  const onPlay = (id: string) => {
    if (!isLoading && !user) {
      return onOpen()
    }
    player.setId(id)
    player.setIds(songs.map((song) => song.id))
  }

  return onPlay
}

export default useOnPlay
