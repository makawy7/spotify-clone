'use client'

import { FaHeart } from 'react-icons/fa'
import Button from './Button'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/useUser'
import toast from 'react-hot-toast'
import useAuthModal from '@/hooks/useAuthModal'
import { useRouter } from 'next/navigation'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type LikeButtonProps = {
  songId: string
  likedByUser: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, likedByUser }) => {
  const supbaseClient = useSupabaseClient()
  const { user, isLoading } = useUser()
  const { onOpen } = useAuthModal()
  const router = useRouter()

  const handleOnClick = async () => {
    if (!isLoading && user) {
      const { error } = likedByUser
        ? await supbaseClient
            .from('liked')
            .delete()
            .eq('song_id', songId)
            .eq('user_id', user.id)
        : await supbaseClient.from('liked').insert({
            song_id: songId,
            user_id: user.id,
          })
      if (error) {
        return toast.error('Something went wrong!')
      } else {
        router.refresh()
        return likedByUser
          ? toast.success('Song removed from favorites!')
          : toast.success('Song added to favorites!')
      }
    } else if (!isLoading && !user) {
      onOpen()
    }
  }

  const Icon = likedByUser ? AiFillHeart : AiOutlineHeart
  return (
    <Button
      className={`text-xl transition ${likedByUser ? 'text-green-500' : 'text-neutral-400'}`}
      onClick={handleOnClick}
    >
      <Icon size={25} />
    </Button>
  )
}

export default LikeButton
