'use client'

import { useRouter } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/useUser'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'

type HeaderProps = {
  children: React.ReactNode
  className?: string
}
const Header: React.FC<HeaderProps> = ({ children, className = '' }) => {
  const router = useRouter()
  const { onOpen } = useAuthModal()

  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    router.refresh()

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out!')
    }
  }

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className,
      )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center justify-center gap-x-2 md:flex">
          <button
            onClick={() => router.back()}
            className="cursor-pointer rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="cursor-pointer rounded-full  bg-black transition hover:opacity-75"
          >
            <RxCaretRight size={35} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-x-2 md:hidden">
          <button className=" rounded-full bg-white p-2 text-black hover:opacity-75">
            <HiHome size={20} />
          </button>
          <button className=" rounded-full bg-white p-2 text-black hover:opacity-75">
            <BiSearch size={20} />
          </button>
        </div>
        {user ? (
          <div className="flex items-center justify-center gap-x-2">
            <Button onClick={handleLogout} className="bg-white font-bold">
              Logout
            </Button>
            <Button
              onClick={() => {
                router.push('/account')
              }}
              className="bg-green-400 p-3 font-bold"
            >
              <FaUserAlt />
            </Button>
          </div>
        ) : (
          <div>
            <Button onClick={onOpen} className="text-white">
              Sign Up
            </Button>
            <Button onClick={onOpen} className="bg-white font-bold">
              Login
            </Button>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export default Header
