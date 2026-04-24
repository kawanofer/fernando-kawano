'use client';

import React from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { skillIcons } from '@/libs/skillIcons';
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
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.04,
      },
    },
  };

  const item = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  };

  return (
    <Section id="skills" className="bg-background-2">
      <SectionTitle title={t('skills.title')} />

      <motion.div
        className="flex flex-wrap gap-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
      >
        {mainSkills.map(skill => (
          <motion.div key={skill} variants={item}>
            <Pill value={skill} {...(skillIcons[skill] ? { icon: skillIcons[skill] } : {})} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
