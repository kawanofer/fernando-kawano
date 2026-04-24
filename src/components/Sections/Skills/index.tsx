'use client';

import React from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { skillColors, skillIcons } from '@/libs/skillIcons';
import { useTranslation } from '@/libs/translations';

import Pill from './Pill';

type SkillCategory = {
  labelKey: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    labelKey: 'skills.category.coreLanguages',
    skills: ['JavaScript', 'TypeScript'],
  },
  {
    labelKey: 'skills.category.frontEndFrameworks',
    skills: ['React', 'Next.js', 'React Query', 'AngularJS', 'SharePoint (SPFx)'],
  },
  {
    labelKey: 'skills.category.stateManagement',
    skills: ['Redux (Saga/Thunk/Toolkit)', 'Context API'],
  },
  {
    labelKey: 'skills.category.stylingUiUx',
    skills: [
      'Accessibility',
      'Bootstrap',
      'Material-UI',
      'Responsive Web Design',
      'Styled-components',
      'Tailwind CSS',
    ],
  },
  {
    labelKey: 'skills.category.backEndDatabase',
    skills: [
      'Firebase',
      'MongoDB',
      'MySQL',
      'NestJS',
      'Node.js',
      'Prisma',
      'REST API',
      'Supabase',
    ],
  },
  {
    labelKey: 'skills.category.testingQuality',
    skills: ['Jest', 'Unit Testing', 'Code Review', 'Clean Code'],
  },
  {
    labelKey: 'skills.category.buildToolsDevOps',
    skills: [
      'AWS',
      'Azure',
      'CI/CD',
      'CircleCI',
      'Git',
      'Jenkins',
      'Vercel',
      'Vite',
      'Webpack',
    ],
  },
  {
    labelKey: 'skills.category.designCollaboration',
    skills: [
      'Adobe XD',
      'Agile Methodologies',
      'Jira',
      'Kanban',
      'Scrum',
      'Zeplin',
    ],
  },
];

export default function Skills() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const categoryVariants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <Section id="skills" className="bg-background-2">
      <SectionTitle title={t('skills.title')} />

      <motion.div
        className="container flex flex-col gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
      >
        {skillCategories.map(category => (
          <motion.div key={category.labelKey} variants={categoryVariants}>
            <p className="text-secondary mb-3 text-xs tracking-widest uppercase">
              {t(category.labelKey)}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <Pill
                  key={skill}
                  value={skill}
                  {...(skillIcons[skill] ? { icon: skillIcons[skill] } : {})}
                  {...(skillColors[skill]
                    ? { iconColor: skillColors[skill] }
                    : {})}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
