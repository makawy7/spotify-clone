import getUserLikedSongs from '@/actions/getUserLikedSongs'
import Header from '@/components/Header'
import LikedContent from '@/components/LikedContent'
import Image from 'next/image'

export const revalidate = 0

const Liked = async () => {
  const songs = await getUserLikedSongs()
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header>
        <div className="mt-20 flex items-center gap-x-6">
          <div className="relative flex h-32 w-32  lg:h-40 lg:w-40">
            <Image src={'/images/liked.png'} fill alt="liked playlist" />
          </div>
          <div className="space-y-4">
            <h5>Playlist</h5>
            <h1 className="text-5xl font-bold">Liked Songs</h1>
          </div>
        </div>
      </Header>
      <div className="px-5 mt-5">
        <LikedContent songs={songs} />
      </div>
    </div>
  )
}

export default Liked
