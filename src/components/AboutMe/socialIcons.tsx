import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SocialIcons() {
  return (
    <div className='flex justify-center mt-10'>
      <motion.div whileHover={{ scale: 1.2 }}>
        <Link href='https://github.com/kawanofer' target='_blank'>
          <motion.svg
            initial={{ opacity: 0.0, y: -10 }}
            animate={{ opacity: 1, y: '10px' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className='text-5xl hover:text-secondary'
            xmlns='http://www.w3.org/2000/svg'
            width={48}
            height={48}>
            <FaGithub />
          </motion.svg>
        </Link>
      </motion.div>

      <div className='mx-5'>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Link
            href='https://www.linkedin.com/in/fernandokawano/'
            target='_blank'>
            <motion.svg
              initial={{ opacity: 0.1, y: -10 }}
              animate={{ opacity: 1, y: '10px' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className='text-5xl hover:text-secondary'
              xmlns='http://www.w3.org/2000/svg'
              width={48}
              height={48}>
              <FaLinkedin />
            </motion.svg>
          </Link>
        </motion.div>
      </div>

      <motion.div whileHover={{ scale: 1.2 }}>
        <Link href='mailto:kawano.fer@gmail.com'>
          <motion.svg
            initial={{ opacity: 0.2, y: -10 }}
            animate={{ opacity: 1, y: '10px' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className='text-5xl hover:text-secondary'
            xmlns='http://www.w3.org/2000/svg'
            width={48}
            height={48}>
            <AiOutlineMail />
          </motion.svg>
        </Link>
      </motion.div>
    </div>
  )
}
