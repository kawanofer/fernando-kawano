'use client';
'use client';

import React from 'react';

import Image from 'next/image';

import { Tooltip } from '@mui/material';

import SectionTitle from '@/components/UI/SectionTitle';

import { useTranslation } from '@/libs/translations';

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <section
      id="aboutme"
      className="bg-background-2 rounded-md p-8 pt-16 pb-16"
    >
      <SectionTitle title={t('about.title')} />

      <div className="m-auto flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between">
        <div className="mr-0 mb-14 flex items-center md:mr-16">
          <Image
            className="bg-secondary rounded-full"
            src="/kawano.png"
            alt="Fernando Kawano picture"
            width={290}
            height={290}
            quality={100}
          />
        </div>

        <div className="bg-background p-4 text-white md:w-4/5">
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
    </section>
  );
}
