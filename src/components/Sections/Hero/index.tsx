'use client';

import React from 'react';

import Image from 'next/image';

import { FaCloudDownloadAlt } from 'react-icons/fa';

import Button from '@/components/UI/Button';
import { Section } from '@/components/UI/Section';

import { useTranslation } from '@/libs/translations';

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
    <Section className="flex justify-between" role="banner" aria-label="Hero introduction">
      <div className="flex w-full flex-col justify-between lg:w-auto">
        <header className="mb-8 text-center lg:text-left">
          <h1 className="text-bold color-text text-4xl sm:text-5xl">
            <span className="block">{t('hero.greeting')}</span>
            <span className="block">
              Fernando <strong>Kawano</strong>
            </span>
          </h1>
          <p 
            className="pt-2 text-xl font-thin text-zinc-500 sm:text-2xl"
            role="doc-subtitle"
          >
            {t('hero.title')}
          </p>
          <p className="flex justify-center pt-2 text-base font-thin text-zinc-500 sm:text-lg lg:justify-start">
            {t('hero.location')}
          </p>
        </header>

        <div className="flex justify-center lg:justify-start">
          <Button
            icon={FaCloudDownloadAlt}
            onClick={handleOpenCV}
            className="flex w-48 items-center gap-3"
            aria-label="Download Fernando Kawano's CV (opens in new tab)"
          >
            {t('hero.downloadCV')}
          </Button>
        </div>
      </div>
      <div className="hidden lg:block" role="img" aria-label="Decorative Japanese kanji symbol">
        <Image
          alt="Decorative Japanese kanji symbol representing Fernando Kawano"
          className="rounded-full bg-white"
          priority={false}
          src={KawnaoKanji}
          width={0}
          height={0}
          sizes="400vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </Section>
  );
}
