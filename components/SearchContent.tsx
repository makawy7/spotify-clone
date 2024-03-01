'use client'

import { Song } from '@/types/types'
import MediaItem from './MediaItem'

type SearchContentType = {
  songs: Song[]
}

const SearchContent: React.FC<SearchContentType> = ({ songs }) => {
  if (songs.length === 0) {
    return <div className="w-full text-neutral-400">No songs found.</div>
  }

  return (
    <div className='space-y-2'>
      {songs.map((song) => (
        <MediaItem key={song.id} song={song} />
      ))}
    </div>
  )
}
export default SearchContent
