'use client'

import React from 'react'

import Title from '@/components/Title'
import { motion } from 'framer-motion'

import Pill from './Pill'

const mainSkills = [
  'ReactJs',
  'JavaScript',
  'TypeScript',
  'Redux',
  'Context API',
  'Styled-components',
  'Firebase',
  'Git',
  'Tailwind css'
]

const skills = [
  'Adobe XD',
  'Agile Methodologies',
  'AngularJs',
  'Azure',
  'Bootstrap',
  'Code Review',
  'Jest',
  'MongoDB',
  'NextJs',
  'Prisma',
  'Responsive Web Design',
  'Scrum',
  'Sharepoint (SPfx)',
  'Software Development',
  'Zeplin'
]

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const skillRotateEffect = () => {
  const rotateDegree = 3
  const maxRandomValue = 5
  return Math.floor(Math.random() * maxRandomValue) % 2 === 0 ?
    rotateDegree
    : -rotateDegree
}

export default function Skills() {
  return (
    <section id='skills' className='p-8 pb-16'>
      <Title title='Skills' />

      <h3 className='text-2xl font-bold'>Main Skills</h3>
      <motion.div
        className='container'
        variants={container}
        initial='hidden'
        animate='visible'>
        <div className='flex gap-3 flex-wrap mb-10 mt-3'>
          {mainSkills.map((skill) => {
            return (
              <motion.div
                key={skill}
                variants={item}
                whileHover={{ opacity: 0.6, rotate: skillRotateEffect() }}>
                <Pill key={skill} value={skill} />
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <h3 className='text-2xl font-bold'>Other skills</h3>
      <motion.div
        className='container'
        variants={container}
        initial='hidden'
        animate='visible'>
        <div className='flex gap-3 flex-wrap mb-10 mt-3'>
          {skills.map((skill) => {
            return (
              <motion.div
                key={skill}
                variants={item}
                whileHover={{ opacity: 0.6, rotate: skillRotateEffect() }}>
                <Pill key={skill} value={skill} />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
