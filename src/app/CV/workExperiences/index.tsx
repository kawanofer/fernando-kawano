'use client';

import React from 'react';

import workExperiences from './workExperiences.json';

type experiencesProps = {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
};

export default function Company() {
  return (
    <div>
      <div className="text-1xl mb-3 font-semibold text-tertiary">
        WORK EXPERIENCE
      </div>
      {workExperiences?.map((item: experiencesProps) => (
        <div key={item.period} className="mb-5">
          <div className="flex justify-between">
            <div className="font-semibold">{item.company}</div>
            <div>{item.location}</div>
          </div>
          <div>
            {item.position} - {item.period}
          </div>
          <div className="py-5">{item.description}</div>
        </div>
      ))}
    </div>
  );
}
