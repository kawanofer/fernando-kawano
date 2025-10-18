'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { FaCloudDownloadAlt } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';

import Button from '@/components/Button';

import KawnaoKanji from '../../../public/kawano-kanji.svg';

export default function Hero() {
  return (
    <section className="flex justify-between p-8 pb-16 lg:px-20">
      <div className="flex flex-col justify-between">
        <div className="mb-8">
          <div className="text-bold text-5xl leading-snug">
            Hi! I am
            <br />
            <Typewriter
              options={{
                strings: ['Fernando <strong>Kawano</strong>'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <p className="pt-2 text-2xl font-thin text-zinc-500">
            Frontend developer
          </p>
          <p className="flex pt-2 text-lg font-thin text-zinc-500">
            Curitiba - Brazil
          </p>
        </div>

        <Link href="/cv-en.pdf" target="_blank">
          <Button className="flex w-48 items-center gap-3 ">
            Download CV{' '}
            <span>
              <FaCloudDownloadAlt />
            </span>
          </Button>
        </Link>
      </div>
      <div className="hidden lg:block">
        <Image
          alt="Fernando Kawano picture"
          className="rounded-full bg-white"
          priority={false}
          src={KawnaoKanji}
          width={0}
          height={0}
          sizes="400vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </section>
  );
}
