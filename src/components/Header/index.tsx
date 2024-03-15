'use client'

import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

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

  return (
    <header
      ref={ref}
      className='py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap justify-between'>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting ?
            'bg-zinc-900/0 border-transparent'
          : 'bg-zinc-900/500  border-zinc-800 '
        }`}>
        <div className='container flex items-center justify-between p-6 mx-auto'>
          <Link href='/' className='font-black'>
            <Image
              className='rounded-full bg-white p-2 hover:opacity-3'
              src='/kawa-head-icon.png'
              width={60}
              height={60}
              alt='Japanese kanji KAWA'
            />
          </Link>

          <div className='flex justify-between gap-8'>
            {menuList.map((menu) => (
              <Link
                key={menu.label}
                href={menu.href}
                className='duration-200 text-zinc-400 hover:text-zinc-100'>
                {menu.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
