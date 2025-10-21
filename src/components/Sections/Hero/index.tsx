'use client';
'use client';

import React from 'react';

import Image from 'next/image';

import { FaCloudDownloadAlt } from 'react-icons/fa';

import Button from '@/components/UI/Button';

import { useTranslation } from '@/lib/translations';

import KawnaoKanji from '/public/kawano-kanji.svg';

export default function Hero() {
  const { t } = useTranslation();

  const handleOpenCV = () => {
    if (localStorage.getItem('language') === 'en') {
      window.open(
        'https://drive.google.com/file/d/1Hr9KCd0R1M77C6o5iDPC8n6SbjsI1HjT/view?usp=sharing',
        '_blank'
      );
      return;
    }

    window.open(
      'https://drive.google.com/file/d/1Ht85MjFojY6TnbW-1mpwUtnfI8859ZpW/view?usp=sharing',
      '_blank'
    );
  };

  return (
    <section className="flex justify-between p-8 pb-16 pt-16 lg:px-20">
      <div className="flex flex-col justify-between">
        <div className="mb-8">
          <div className="text-bold text-5xl leading-snug">
            {t('hero.greeting')}
            <br />
            Fernando <strong>Kawano</strong>
          </div>
          <p className="pt-2 text-2xl font-thin text-zinc-500">
            {t('hero.title')}
          </p>
          <p className="flex pt-2 text-lg font-thin text-zinc-500">
            {t('hero.location')}
          </p>
        </div>

        <Button
          onClick={handleOpenCV}
          className="flex w-48 items-center gap-3 "
        >
          {t('hero.downloadCV')}{' '}
          <span>
            <FaCloudDownloadAlt />
          </span>
        </Button>
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
