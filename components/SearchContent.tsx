'use client'

import { Song, favSongs } from '@/types/types'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'

type SearchContentType = {
  songs: Song[]
  favSongs: favSongs[]
}

const SearchContent: React.FC<SearchContentType> = ({ songs, favSongs }) => {
  const fav = favSongs.map((song) => song.song_id)

  const likedByUser = (songId: string): boolean => {
    if (fav.includes(+songId)) {
      return true
    }
    return false
  }

  if (songs.length === 0) {
    return <div className="w-full text-neutral-400">No songs found.</div>
  }

  return (
    <div className="space-y-2">
      {songs.map((song) => (
        <div className="flex items-center justify-between" key={song.id}>
          <div className='flex-1'>
            <MediaItem song={song} />
          </div>
          <LikeButton likedByUser={likedByUser(song.id)} songId={song.id} />
        </div>
      ))}
    </div>
  )
}
export default SearchContent
