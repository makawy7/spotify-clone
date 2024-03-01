'use client'

import { useUser } from '@/hooks/useUser'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaPlay } from 'react-icons/fa'

type ListItemProps = {
  href: string
  name: string
  image: string
}
const ListItem: React.FC<ListItemProps> = ({ href, name, image }) => {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const handleOnClick = () => {
    if (!isLoading && user) {
      router.push(href)
    }
  }
  return (
    <button
      onClick={handleOnClick}
      className="group flex w-full items-center justify-between rounded-lg bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
    >
      <div className="flex min-h-16 min-w-16 items-center gap-x-4">
        <Image src={image} alt="liked songs" width={64} height={64} />
        <p className="font-semibold">{name}</p>
      </div>
      <div className="hidden rounded-full bg-green-500 p-3 transition hover:scale-110 group-hover:flex">
        <FaPlay className="translate-x-0.5 text-black" />
      </div>
    </button>
  )
}

export default ListItem
