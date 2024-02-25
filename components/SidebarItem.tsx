import Link from 'next/link'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

type SidebarItemProps = {
  icon: IconType
  label: string
  active?: boolean
  href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
        flex
        gap-x-4
        items-center
        w-full
        text-md
        font-medium
        cursor-pointer
        text-neutral-400
        hover:text-white
        transition
        `,
        active && 'text-white'
      )}
    >
      <Icon size={26} />
      <div className="truncate w-full">{label}</div>
    </Link>
  )
}

export default SidebarItem
