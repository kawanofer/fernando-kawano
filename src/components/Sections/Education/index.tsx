'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion, useReducedMotion } from 'framer-motion';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useTranslation } from '@/libs/translations';

type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  institution: string;
  logo: string;
  detail?: string;
  credentialUrl?: string;
  credentialLabel?: string;
};

type TimelineItemProps = TimelineEntry & {
  index: number;
  prefersReducedMotion: boolean | null;
};

function TimelineItem({
  period,
  title,
  institution,
  logo,
  detail,
  credentialUrl,
  credentialLabel,
  index,
  prefersReducedMotion,
}: Readonly<TimelineItemProps>) {
  return (
    <motion.div
      className="relative pb-8 pl-10 last:pb-0"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.5,
        ease: 'easeOut' as const,
        delay: index * 0.15,
      }}
    >
      {/* Institution logo circle */}
      <div
        className="border-border absolute top-0 left-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border bg-white shadow-sm"
        aria-hidden="true"
      >
        <Image
          src={logo}
          alt=""
          width={24}
          height={24}
          className="object-contain p-0.5"
        />
      </div>

      <p className="text-tertiary mb-1 text-xs tracking-widest uppercase">
        {period}
      </p>
      <h3 className="text-text text-base font-semibold">{title}</h3>
      <p className="text-secondary text-sm">{institution}</p>

      {detail && (
        <div className="border-tertiary bg-background-2 text-secondary mt-3 rounded-md border-l-2 px-4 py-3 text-sm">
          {detail}
          {credentialUrl && (
            <Link
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary mt-2 inline-flex items-center gap-1 underline-offset-2 hover:underline"
            >
              {credentialLabel ?? 'See Credential'} ↗
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Education() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const degrees: TimelineEntry[] = [
    {
      id: 'degree1',
      period: t('education.period1'),
      title: t('education.degree1'),
      institution: t('education.institution1'),
      logo: '/positivo.svg',
    },
    {
      id: 'degree2',
      period: t('education.period2'),
      title: t('education.degree2'),
      institution: t('education.institution2'),
      logo: '/positivo.svg',
    },
  ];

  const certifications: TimelineEntry[] = [
    {
      id: 'cert1',
      period: t('education.cert1.period'),
      title: t('education.cert1.title'),
      institution: t('education.cert1.institution'),
      logo: '/microsoft.svg',
      detail: t('education.cert1.detail'),
      credentialLabel: t('education.cert1.seeCredential'),
      credentialUrl:
        'https://www.credly.com/badges/f7f895da-db5b-4aea-92e7-787fe082a0fd/linked_in_profile',
    },
  ];

  return (
    <Section id="education">
      <SectionTitle title={t('education.title')} />

      {/* Timeline wrapper with gradient line */}
      <div className="relative pl-4">
        <div
          className="absolute top-0 left-4 h-full w-px"
          style={{
            background:
              'linear-gradient(to bottom, #435585, #F5E8C6, #435585, #818FB4)',
          }}
          aria-hidden="true"
        />

        {degrees.map((entry, i) => (
          <TimelineItem
            key={entry.id}
            {...entry}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}

        {/* Certifications label */}
        <motion.p
          className="text-border relative mb-4 pl-10 text-xs tracking-widest uppercase"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: degrees.length * 0.15 }}
        >
          {t('education.certification')}
        </motion.p>

        {certifications.map((entry, i) => (
          <TimelineItem
            key={entry.id}
            {...entry}
            index={degrees.length + 1 + i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </Section>
  );
}
