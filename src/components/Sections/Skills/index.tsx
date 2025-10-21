'use client';

import React from 'react';

import Title from '@/components/UI/Title';

import { useTranslation } from '@/lib/translations';

import Pill from './Pill';

const mainSkills = [
  'ReactJs',
  'JavaScript',
  'TypeScript',
  'Redux',
  'Context API',
  'Styled-components',
  'Firebase',
  'Git',
  'Tailwind css',
  'Adobe XD',
  'Agile Methodologies',
  'AngularJs',
  'Azure',
  'Bootstrap',
  'Code Review',
  'Jest',
  'MongoDB',
  'NextJs',
  'Prisma',
  'Responsive Web Design',
  'Scrum',
  'Sharepoint (SPfx)',
  'Software Development',
  'Zeplin',
];

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="bg-background2 p-8 pb-16 pt-16">
      <Title title={t('skills.title')} />

      <div className="container">
        <div className="mb-10 mt-3 flex flex-wrap gap-3">
          {mainSkills.map(skill => {
            return (
              <div
                key={skill}
                className="transition-all duration-300 hover:opacity-60"
              >
                <Pill key={skill} value={skill} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
