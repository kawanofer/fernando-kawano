'use client';

import React from 'react';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import { useTranslation } from '@/libs/translations';

import Pill from './Pill';

const mainSkills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'AngularJS',
  'SharePoint (SPFx)',
  'Redux (Saga/Thunk/Toolkit)',
  'Context API',
  'Styled-components',
  'Tailwind CSS',
  'Material-UI',
  'Bootstrap',
  'Responsive Web Design',
  'Accessibility',
  'Node.js',
  'NestJS',
  'Prisma',
  'REST API',
  'MongoDB',
  'Firebase',
  'MySQL',
  'Jest',
  'Unit Testing',
  'Code Review',
  'Clean Code',
  'Vite',
  'Webpack',
  'Git',
  'CI/CD',
  'Azure',
  'Azure DevOps',
  'Adobe XD',
  'Zeplin',
  'Jira',
  'Agile Methodologies',
  'Scrum',
  'Kanban',
];

export default function Skills() {
  const { t } = useTranslation();
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <Section id="skills" className="bg-background-2">
      <SectionTitle title={t('skills.title')} />

      <div ref={ref} className="container">
        <div className="flex flex-wrap gap-3">
          {mainSkills.map((skill, index) => (
            <div
              key={skill}
              className="transition-all duration-500 hover:opacity-60"
              style={{
                transitionDelay: inView ? `${index * 40}ms` : '0ms',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <Pill value={skill} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
