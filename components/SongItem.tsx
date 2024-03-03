'use client'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types/types'
import Image from 'next/image'
import PlayButton from './PlayButton'

type SongItemProps = {
  song: Song
  onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({ song, onClick }) => {
  const imagePath = useLoadImage(song)
  return (
    <div
      onClick={() => onClick(song.id)}
      className="group relative flex w-full cursor-pointer flex-col justify-center gap-y-2 rounded-md bg-neutral-400/5 p-3 font-semibold transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image src={imagePath || '/images/liked.png'} alt="song" fill />
      </div>
      <div className="space-y-1 pt-2">
        <p className="w-full font-semibold">{song.title}</p>
        <p className="w-full text-sm text-neutral-400">{song.author}</p>
      </div>
      <div className="absolute bottom-[85px] right-5">
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
