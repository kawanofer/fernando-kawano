'use client'

import React from 'react'

import Title from '@/components/Title'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Tooltip } from '@mui/material'

import SocialIcons from './socialIcons'

export default function AboutMe() {
  return (
    <motion.section
      className='card'
      initial={{
        opacity: 0,
        x: -300
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          ease: 'easeInOut',
          duration: 1
        }
      }}
      viewport={{ once: true }}>
      <section id='aboutme' className='bg-background2 p-8 pb-16 rounded-md'>
        <Title title='About me' />

        <div className='flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between m-auto'>
          <div className='flex items-center md:mr-16 mb-14 mr-0'>
            <Image
              className='rounded-full bg-secondary'
              src='/kawano.png'
              alt='Fernando Kawano picture'
              width={290}
              height={290}
              quality={100}
            />
          </div>

          <div className='text-white bg-background1 p-4 md:w-4/5'>
            <p className='text-lg leading-relaxed'>
              I&apos;m a software developer with over 10 years of experience
              working in the IT industry, specializing in web development using
              JavaScript’s modern framework, React. I&apos;m also skilled with
              Sharepoint writing and modifying code to build applications and
              sites for clients based on their needs and requirements. I worked
              from startups to big companies, developing several systems with
              variant complexity.
              <br />
              <br />I always try to meet and exceed expectations, and I enjoy
              working collaboratively with people involved in the project to
              achieve the goals. I&apos;m passionate about continuous learning
              and keeping my skills up-to-date with the latest JavaScript
              technologies.
            </p>

            <div className='flex flex-col gap-5 mt-5'>
              <div className='flex items-center gap-2'>
                <Tooltip title='English'>
                  <Image
                    className='rounded-full'
                    src='/en.png'
                    alt='English flag'
                    width={20}
                    height={20}
                  />
                </Tooltip>
                <p>B2/C1</p>
              </div>

              <div className='flex items-center gap-2'>
                <Tooltip title='Portuguese (Brazil)'>
                  <Image
                    className='rounded-full'
                    src='/br.png'
                    alt='Brazilian flag'
                    width={20}
                    height={20}
                  />
                </Tooltip>
                <p>Native</p>
              </div>
            </div>
          </div>
        </div>
        <SocialIcons />
      </section>
    </motion.section>
  )
}
