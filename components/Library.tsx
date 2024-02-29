import { AiOutlineCode, AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'

const Library = () => {
  const authModal = useAuthModal()
  const { user, isLoading } = useUser()
  const { onOpen } = useUploadModal()
  const handleOnClick = () => {
    if (!isLoading && !user) {
      return authModal.onOpen()
    }

    if (!isLoading && user) {
      onOpen()
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-x-2 text-neutral-400 transition hover:text-white">
          <TbPlaylist size={24} />
          <p className="font-medium">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleOnClick}
          size={20}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="mt-4 flex flex-col px-3">List of Songs!</div>
    </div>
  )
}

export default Library
