import React from 'react';

import Title from '@/components/UI/Title';

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
];

const skills = [
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
  return (
    <section id="skills" className="p-8 pb-16 pt-16">
      <Title title="Skills" />

      <h3 className="text-2xl font-bold">Main Skills</h3>
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

      <h3 className="text-2xl font-bold">Other skills</h3>
      <div className="container">
        <div className="mb-10 mt-3 flex flex-wrap gap-3">
          {skills.map(skill => {
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
