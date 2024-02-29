'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import SidebarItem from './SidebarItem'
import Box from './Box'
import Library from './Library'
import { Song } from '@/types/types'

type SidebarProps = {
  children: React.ReactNode
  songs: Song[]
}

const SideBar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname()
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname],
  )
  return (
    <div className="flex h-full">
      <div
        className="
                hidden
                h-full
                w-[300px]
                flex-col
                gap-y-2
                rounded-sm
                p-2
                md:flex"
      >
        <Box>
          <div className=" space-y-4 rounded-lg bg-neutral-900 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  )
}

export default SideBar
