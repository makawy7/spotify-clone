import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types/types'
import Image from 'next/image'

type MediaItemProps = {
  song: Song
}
const MediaItem: React.FC<MediaItemProps> = ({ song }) => {
  const imagePath = useLoadImage(song)

  return (
    <div className="flex gap-x-4 cursor-pointer hover:bg-neutral-400/10 rounded-md p-2">
      <div className="relative min-h-[64px] min-w-[64px] rounded-md">
        <Image
          className="rounded-md"
          src={imagePath || '/images/liked.png'}
          alt={song.title}
          fill
        />
      </div>
      <div className="flex flex-col justify-between py-1">
        <p className="text-sm font-semibold">{song.title}</p>
        <p className="text-neutral-400">{song.author}</p>
      </div>
    </div>
  )
}

export default MediaItem
