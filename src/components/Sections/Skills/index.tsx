'use client';

import React from 'react';

import { Section } from '@/components/UI/Section';
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
    <Section id="skills" className="bg-background-2">
      <SectionTitle title={t('skills.title')} />

      <div className="container">
        <div className="flex flex-wrap gap-3">
          {mainSkills.map((skill, index) => {
            return (
              <div
                key={skill}
                className="transition-all duration-300 hover:opacity-60"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0,
                  transform: 'translateY(20px)',
                }}
              >
                <Pill value={skill} />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Section>
  );
}
