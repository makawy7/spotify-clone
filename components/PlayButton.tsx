import { FaPlay } from 'react-icons/fa'
import Button from './Button'

const PlayButton = () => {
  return (
    <Button
      className="
            flex
            translate-y-1/4
            items-center
            rounded-full
            bg-green-500
            p-4
            text-black
            opacity-0
            transition
            hover:scale-110
            group-hover:opacity-100
            group-hover:translate-y-0
            "
    >
      <FaPlay size={20} />
    </Button>
  )
}

export default PlayButton
