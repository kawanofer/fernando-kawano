import React from 'react';

import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

import workExperiences from './workExperiences.json';
import { Title } from '@/components/UI';

type ExperienceProps = {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
};

const formatDescription = (description: string): string[] => {
  // Clean up repetitive text and split into bullet points
  const cleaned = description
    .replace(/\s+/g, ' ')
    .replace(/\.\s*\*/g, '.\n*')
    .replace(/\*\s+/g, '• ')
    .trim();

  // Split by bullet points or periods followed by capital letters
  const sentences = cleaned
    .split(/(?:•|\.(?=\s*[A-Z]))/g)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  return sentences.slice(0, 4); // Limit to 4 key points
};

export default function WorkExperiences() {
  return (
    <section id="experiences" className="rounded-md p-8 pb-16 pt-16 bg-background2">
      <Title title="Work Experience" />

      <div className="space-y-6">
        {workExperiences?.map((item: ExperienceProps, index) => (
          <div
            key={`${item.company}-${item.period}`}
            className="relative rounded-lg border border-gray-200 p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            {/* Header */}
            <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h3 className="mb-1 text-xl font-bold text-tertiary">
                  {item.position}
                </h3>
                <div className="flex items-center gap-2 font-semibold text-secondary">
                  <span>{item.company}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm lg:items-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="prose prose-sm max-w-none">
                <ul className="space-y-2 leading-relaxed text-white">
                  {formatDescription(item.description).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 text-sm text-secondary">•</span>
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
