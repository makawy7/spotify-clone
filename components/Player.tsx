'use client'

import useGetSongById from '@/hooks/useGetSongById'
import useLoadSong from '@/hooks/useLoadSong'
import usePlayer from '@/hooks/usePlayer'
import PlayerContent from './PlayerContent'

const Player = () => {
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)
  const songUrl = useLoadSong(song!)

  if (!song || !songUrl || !player.activeId) {
    return null
  }

  return (
    <div className="fixed bottom-0 h-24 w-full bg-black py-2">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
