'use client'

import React from 'react'

import Title from '@/components/Title'
import { motion } from 'framer-motion'

export default function Portfolio() {
  return (
    <motion.section
      className='card'
      initial={{
        opacity: 0,
        x: 300
      }}
      whileInView={{
        opacity: 1,
        x: 0, // Slide in to its original position
        transition: {
          ease: 'easeInOut',
          duration: 1
        }
      }}
      viewport={{ once: true }}>
      <section id='portfolio' className='bg-background2 p-8 pb-16 rounded-md'>
        <Title title='Portfolio' />
      </section>
    </motion.section>
  )
}
