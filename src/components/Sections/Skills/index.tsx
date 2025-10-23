'use client';

import React from 'react';

import SectionTitle from '@/components/UI/SectionTitle';

import { useTranslation } from '@/libs/translations';

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
    <section id="skills" className="bg-background-2 p-8 pt-16 pb-16">
      <SectionTitle title={t('skills.title')} />

      <div className="container">
        <div className="mt-3 mb-10 flex flex-wrap gap-3">
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
