'use client'

import React from 'react'
import { FaCloudDownloadAlt } from 'react-icons/fa'

import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'
import Typewriter from 'typewriter-effect'

import KawnaoKanji from '../../../public/kawano-kanji.svg'

export default function Hero() {
  return (
    <section className='p-8 pb-16 flex justify-between lg:px-20'>
      <div className='flex flex-col justify-between'>
        <div className='mb-8'>
          <div className='text-5xl text-bold leading-snug'>
            Hi! I am
            <br />
            <Typewriter
              options={{
                strings: ['Fernando <strong>Kawano</strong>'],
                autoStart: true,
                loop: true
              }}
            />
          </div>
          <p className='pt-2 text-zinc-500 text-2xl font-thin'>
            Frontend developer
          </p>
          <p className='pt-2 text-zinc-500 text-lg font-thin flex'>
            Curitiba - Brazil
          </p>
        </div>

        <Link href='/cv-en.pdf' target='_blank'>
          <Button className='w-48 flex gap-3 items-center '>
            Download CV{' '}
            <span>
              <FaCloudDownloadAlt />
            </span>
          </Button>
        </Link>
      </div>
      <div className='hidden lg:block'>
        <Image
          alt='Fernando Kawano picture'
          className='rounded-full bg-white'
          priority={false}
          src={KawnaoKanji}
          width={0}
          height={0}
          sizes='400vw'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </section>
  )
}
