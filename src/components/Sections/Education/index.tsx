'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useTranslation } from '@/libs/translations';

type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  institution: string;
  detail?: string;
  credentialUrl?: string;
};

type TimelineItemProps = TimelineEntry & {
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  prefersReducedMotion: boolean | null;
};

function TimelineItem({
  period,
  title,
  institution,
  detail,
  credentialUrl,
  isOpen,
  onToggle,
  index,
  prefersReducedMotion,
}: Readonly<TimelineItemProps>) {
  return (
    <motion.div
      className="relative pb-7 pl-8 last:pb-0"
      initial={prefersReducedMotion === true ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.5,
        ease: 'easeOut' as const,
        delay: index * 0.15,
      }}
    >
      {/* Timeline dot */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="border-primary bg-background hover:border-tertiary hover:bg-tertiary focus-visible:ring-tertiary absolute top-1.5 left-0 flex h-3 w-3 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200 hover:shadow-[0_0_12px_rgba(245,232,198,0.4)] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title}`}
      />

      <div className="cursor-pointer" onClick={onToggle} role="presentation">
        <p className="text-tertiary mb-1 text-xs tracking-widest uppercase">
          {period}
        </p>
        <h3 className="text-text text-base font-semibold">{title}</h3>
        <p className="text-secondary text-sm">{institution}</p>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && detail && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' as const }}
            className="overflow-hidden"
          >
            <div className="border-tertiary bg-background-2 text-secondary mt-2 rounded-md border-l-2 px-4 py-3 text-sm">
              {detail}
              {credentialUrl && (
                <Link
                  href={credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary mt-2 inline-flex items-center gap-1 underline-offset-2 hover:underline"
                  onClick={e => e.stopPropagation()}
                >
                  See Credential ↗
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Education() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  const degrees: TimelineEntry[] = [
    {
      id: 'degree1',
      period: t('education.period1'),
      title: t('education.degree1'),
      institution: t('education.institution1'),
    },
    {
      id: 'degree2',
      period: t('education.period2'),
      title: t('education.degree2'),
      institution: t('education.institution2'),
    },
  ];

  const certifications: TimelineEntry[] = [
    {
      id: 'cert1',
      period: 'Apr 2019',
      title: 'Exam 480: Programming in HTML5 with JavaScript and CSS3',
      institution: 'Microsoft',
      detail:
        'Microsoft certification validating proficiency in HTML5, JavaScript, and CSS3 for building modern web applications.',
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
            isOpen={openId === entry.id}
            onToggle={() => toggle(entry.id)}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}

        {/* Certifications label */}
        <motion.p
          className="text-border relative mb-4 pl-8 text-xs tracking-widest uppercase"
          initial={prefersReducedMotion === true ? {} : { opacity: 0 }}
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
            isOpen={openId === entry.id}
            onToggle={() => toggle(entry.id)}
            index={degrees.length + 1 + i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </Section>
  );
}
