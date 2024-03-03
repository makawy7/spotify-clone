'use client'

import { Song } from '@/types/types'
import React, { useEffect, useState } from 'react'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import Slider from './Slider'
import usePlayer from '@/hooks/usePlayer'
import useSound from 'use-sound'

type PlayerContentProps = {
  song: Song
  songUrl: string
}
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer()
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) {
      return player.setId(player.ids[0])
    }

    player.setId(nextSong)
  }

  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const prevSong = player.ids[currentIndex - 1]

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(prevSong)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  })

  useEffect(() => {
    sound?.play()

    return () => {
      sound?.unload()
    }
  }, [sound])

  const handlePlay = () => {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

  return (
    <div className="grid h-full grid-cols-2 items-center px-2 sm:px-3 md:px-6 lg:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem song={song} />
          <LikeButton songId={song.id} likedByUser={true} />
        </div>
      </div>
      <div className="justify-self-end lg:hidden">
        <div
          onClick={handlePlay}
          className="cursor-pointer rounded-full bg-white p-2 text-black"
        >
          <Icon size={30} />
        </div>
      </div>
      <div className="hidden items-center gap-x-10 lg:flex">
        <AiFillStepBackward
          onClick={onPlayPrev}
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
        <div
          onClick={handlePlay}
          className="cursor-pointer rounded-full bg-white p-2 text-black"
        >
          <Icon size={30} />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="hidden items-center gap-x-2 lg:flex">
        <VolumeIcon onClick={toggleMute} size={30} className="cursor-pointer" />
        <Slider onChange={(value) => setVolume(value)} value={volume} />
      </div>
    </div>
  )
}

export default PlayerContent
