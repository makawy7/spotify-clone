'use client'

import SongItem from '@/components/SongItem'
import useOnPlay from '@/hooks/useOnPlay'
import usePlayer from '@/hooks/usePlayer'
import { Song } from '@/types/types'

type PageContentProps = {
  songs: Song[]
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)
  if (songs.length === 0) {
    return <div className="text-xl text-neutral-400">No songs avaiable</div>
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((song) => (
        <SongItem
          onClick={(id: string) => onPlay(id)}
          key={song.id}
          song={song}
        />
      ))}
    </div>
  )
}
export default PageContent
