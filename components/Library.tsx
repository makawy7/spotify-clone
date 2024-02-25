import { AiOutlineCode, AiOutlinePlus } from 'react-icons/ai'
import Box from './Box'
import { TbPlaylist } from 'react-icons/tb'

const Library = () => {
  const handleOnClick = () => {
    console.log('sddddddddddd')
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="text-neutral-400 hover:text-white flex gap-x-2 items-center transition">
          <TbPlaylist size={24} />
          <p className="font-medium">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleOnClick}
          size={20}
          className="text-neutral-400 hover:text-white cursor-pointer transition"
        />
      </div>
      <div className="px-3 mt-4 flex flex-col">List of Songs!</div>
    </div>
  )
}

export default Library
