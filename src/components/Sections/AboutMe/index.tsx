'use client';

import React from 'react';

import Image from 'next/image';

import { Tooltip } from '@mui/material';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import { useTranslation } from '@/libs/translations';

export default function AboutMe() {
  const { t } = useTranslation();
  const { ref: photoRef, inView: photoInView } = useScrollAnimation();
  const { ref: textRef, inView: textInView } = useScrollAnimation();

  return (
    <Section id="aboutme" className="bg-background-2">
      <SectionTitle title={t('about.title')} />

      <div className="m-auto flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between">
        <div
          ref={photoRef}
          className={`mr-0 mb-14 flex items-center transition-all duration-700 md:mr-16 ${
            photoInView
              ? 'translate-x-0 opacity-100'
              : '-translate-x-12 opacity-0'
          }`}
        >
          <Image
            className="bg-secondary rounded-full"
            src="/kawano.png"
            alt="Fernando Kawano picture"
            width={290}
            height={290}
            quality={100}
            sizes="(max-width: 768px) 290px, 290px"
          />
        </div>

        <div
          ref={textRef}
          className={`bg-background p-4 text-white transition-all delay-150 duration-700 md:w-4/5 ${
            textInView
              ? 'translate-x-0 opacity-100'
              : 'translate-x-12 opacity-0'
          }`}
        >
          <p className="text-lg leading-relaxed">
            {t('about.paragraph1')}
            <br />
            <br />
            {t('about.paragraph2')}
            <br />
            <br />
            {t('about.paragraph3')}
            <br />
            <br />
            {t('about.paragraph4')}
          </p>

          <div className="mt-5 flex gap-5">
            <div className="flex items-center gap-2">
              <Tooltip title={t('about.languages.portuguese')}>
                <Image
                  className="rounded-full"
                  src="/br.png"
                  alt="Brazilian flag"
                  width={20}
                  height={20}
                />
              </Tooltip>
              <p>{t('about.languages.level.native')}</p>
            </div>

            <div className="flex items-center gap-2">
              <Tooltip title={t('about.languages.english')}>
                <Image
                  className="rounded-full"
                  src="/en.png"
                  alt="English flag"
                  width={20}
                  height={20}
                />
              </Tooltip>
              <p>{t('about.languages.level.advanced')}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
