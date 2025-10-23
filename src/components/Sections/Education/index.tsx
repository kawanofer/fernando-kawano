'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useTranslation } from '@/libs/translations';

import Microsoft from '/public/microsoft.svg';
import Positivo from '/public/positivo.svg';

export default function Education() {
  const { t } = useTranslation();

  const graduations = [
    {
      degree: t('education.degree1'),
      institution: t('education.institution1'),
      period: t('education.period1'),
      logo: Positivo,
    },
    {
      degree: t('education.degree2'),
      institution: t('education.institution2'),
      period: t('education.period2'),
      logo: Positivo,
    },
  ];
  return (
    <Section id="education">
      <SectionTitle title={t('education.title')} />

      {graduations.map((grad, index) => (
        <div key={index} className="mb-8 flex gap-5">
          <Image
            src={grad.logo}
            alt={`${grad.institution} logo`}
            width={70}
            height={50}
          />
          <div>
            <div className="text-lg font-bold">{grad.degree}</div>
            <div className="italic">{grad.institution}</div>
            <div className="text-zinc-400">{grad.period}</div>
          </div>
        </div>
      ))}

      <h3 className="text-1xl mt-8 mb-5 font-bold">
        {t('education.certification')}
      </h3>
      <div className="flex gap-5">
        <Image src={Microsoft} width={70} height={50} alt="Microsoft logo" />
        <div>
          <div className="text-lg font-bold">
            Exam 480: Programming in HTML5 with JavaScript and CSS3
          </div>
          <div className="italic">Microsoft</div>
          <div className="flex gap-5">
            <div className="text-zinc-400">Issued Apr 2019</div>
            <Link
              href="https://www.credly.com/badges/f7f895da-db5b-4aea-92e7-787fe082a0fd/linked_in_profile"
              target="_blank"
            >
              See Credential
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
