'use client'

import { useUser } from '@/hooks/useUser'
import { Song } from '@/types/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SongItem from './SongItem'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'

type LikedContentProps = {
  songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter()
  const { user, isLoading } = useUser()
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [router, isLoading, user])
  if (songs.length === 0) return <div>No Liked Songs</div>
  return (
    <div className="space-y-2">
      {songs.map((song) => (
        <div className="flex items-center justify-between" key={song.id}>
          <div className="flex-1">
            <MediaItem song={song} />
          </div>
          <LikeButton likedByUser={true} songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default LikedContent
