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
        `text-md flex w-full cursor-pointer items-center gap-x-4 font-medium text-neutral-400 transition hover:text-white`,
        active && 'text-white',
      )}
    >
      <Icon size={26} />
      <div className="w-full truncate">{label}</div>
    </Link>
  )
}

export default SidebarItem
