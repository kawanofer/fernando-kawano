'use client';
'use client';

import React from 'react';

import Image from 'next/image';

import { Tooltip } from '@mui/material';

import Title from '@/components/UI/Title';

import { useTranslation } from '@/lib/translations';

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <section id="aboutme" className="rounded-md bg-background2 p-8 pb-16 pt-16">
      <Title title={t('about.title')} />

      <div className="m-auto flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between">
        <div className="mb-14 mr-0 flex items-center md:mr-16">
          <Image
            className="rounded-full bg-secondary"
            src="/kawano.png"
            alt="Fernando Kawano picture"
            width={290}
            height={290}
            quality={100}
          />
        </div>

        <div className="bg-background1 p-4 text-white md:w-4/5">
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

          <div className="mt-5 flex flex-col gap-5">
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
          </div>
        </div>
      </div>
    </section>
  );
}
