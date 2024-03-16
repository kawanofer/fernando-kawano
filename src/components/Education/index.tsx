'use client'

import React from 'react'

import Title from '@/components/Title'
import Image from 'next/image'

import Positivo from '../../../public/positivo.svg'
import Microsoft from '../../../public/microsoft.svg'

export default function Education() {
  return (
    <section>
      <section id='education' className='p-8 pb-16 rounded-md'>
        <Title title='Education' />

        <div className='flex gap-5'>
          <Image
            src={Positivo}
            alt='Positivo University logo'
            width={0}
            height={0}
            sizes="20vw"
            style={{ width: '100%', maxWidth: '70px', height: 'auto' }}
          />
          <div className='flex-grow-1'>
            <div className='text-lg font-bold'>
              Graduated, Mobile Applications and Cloud Computing
            </div>
            <div className='italic'>Positivo University</div>
            <div className='text-zinc-400'>2013 - 2015 </div>
          </div>
        </div>

        <div className='flex gap-5 mt-8'>
          <Image
            src={Positivo}
            width={70}
            height={50}
            alt='Positivo University logo'
          />
          <div>
            <div className='text-lg font-bold'>
              Bachelor&apos;s degrees, Information System4
            </div>
            <div className='italic'>Positivo University</div>
            <div className='text-zinc-400'>2008 - 2011 </div>
          </div>
        </div>

        <h3 className='text-1xl font-bold mt-8 mb-5'>Certifications</h3>
        <div className='flex gap-5'>
          <Image
            src={Microsoft}
            width={70}
            height={50}
            alt='Microsoft logo'
          />
          <div>
            <div className='text-lg font-bold'>
              Exam 480: Programming in HTML5 with JavaScript and CSS3
            </div>
            <div className='italic'>Microsoft</div>
            <div className='text-zinc-400'>Issued Apr 2019</div>
          </div>
          {/* <Link href='https://www.credly.com/badges/f7f895da-db5b-4aea-92e7-787fe082a0fd/linked_in_profile'>Show Credential</Link> */}
        </div>
      </section>
    </section >
  )
}
