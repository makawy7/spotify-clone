'use client'

import { useRouter } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

type HeaderProps = {
  children: React.ReactNode
  className?: string
}
const Header: React.FC<HeaderProps> = ({ children, className = '' }) => {
  const router = useRouter()
  const handleLogout = () => {
    console.log('handle logout')
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
        <div>
          <Button onClick={() => console.log('Sign Up')} className="text-white">
            Sign Up
          </Button>
          <Button
            onClick={() => console.log('Login')}
            className="bg-white font-bold"
          >
            Login
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header