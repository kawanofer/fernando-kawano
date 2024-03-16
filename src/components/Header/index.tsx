'use client'

import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import kawKanji from '../../../public/kawa-head-icon.svg'

const menuList = [
  {
    label: 'About me',
    href: '#aboutme'
  },
  {
    label: 'Skills',
    href: '#skills'
  },
  {
    label: 'Portfolio',
    href: '#portfolio'
  },
  {
    label: 'Education',
    href: '#education'
  }
]

export default function Navigation() {
  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(true)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting)
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // p-8 pb-16 flex justify-between lg:px-20

  return (
    <header ref={ref} className='py-4 md:py-6 lg:py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between'>
      <div className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b w-full ${isIntersecting ? 'bg-zinc-900/0 border-transparent' : 'bg-zinc-900/500  border-zinc-800 '}`}>
        <div className='container flex items-center justify-between p-2 md:p-4 mx-auto'>
          <Link href='/' className='font-black'>
            <Image
              className='rounded-full p-2 hover:opacity-75'
              src={kawKanji}
              width={50}
              height={50}
              alt='Japanese kanji KAWA'
            />
          </Link>

          <div className='flex md:hidden'>
            <button className="text-zinc-400 hover:text-zinc-100">
              Menu
            </button>
          </div>

          <div className='hidden md:flex justify-between gap-4'>
            {menuList.map((menu) => (
              <Link
                key={menu.label}
                href={menu.href}
                className='duration-200 text-zinc-400 hover:text-white'>
                {menu.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>

  )
}
