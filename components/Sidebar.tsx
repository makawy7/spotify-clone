'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import SidebarItem from './SidebarItem'
import Box from './Box'
import Library from './Library'

type SidebarProps = { children: React.ReactNode }

const SideBar: React.FC<SidebarProps> = ({ children }) => {
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
    [pathname]
  )
  return (
    <div className="flex h-full">
      <div
        className="
                hidden
                md:flex
                flex-col
                w-[300px]
                h-full
                gap-y-2
                rounded-sm
                p-2"
      >
        <Box>
          <div className=" bg-neutral-900 rounded-lg space-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  )
}

export default SideBar
