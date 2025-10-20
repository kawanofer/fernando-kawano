import React from 'react';

import Link from 'next/link';

import { FaDownload, FaEnvelope, FaLinkedin, FaUser } from 'react-icons/fa';

import WorkExperiences from '../../components/Sections/WorkExperiences';

export default function CV() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header Section */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold text-tertiary">
              Fernando Kawano
            </h1>
            <p className="mb-6 text-xl text-secondary">
              Frontend Software Engineer
            </p>

            {/* Contact Information */}
            <div className="mb-6 flex flex-wrap justify-center gap-6">
              <Link
                href="mailto:kawano.fer@gmail.com"
                target="_blank"
                className="flex items-center gap-2 text-gray-600 transition-colors duration-300 hover:text-secondary"
              >
                <FaEnvelope className="text-sm" />
                kawano.fer@gmail.com
              </Link>
              <Link
                href="https://www.linkedin.com/in/fernandokawano/"
                target="_blank"
                className="flex items-center gap-2 text-gray-600 transition-colors duration-300 hover:text-secondary"
              >
                <FaLinkedin className="text-sm" />
                linkedin.com/in/fernandokawano/
              </Link>
            </div>

            {/* Download CV Button */}
            <div className="flex justify-center">
              <Link
                href="https://drive.google.com/file/d/1Hr9KCd0R1M77C6o5iDPC8n6SbjsI1HjT/view?usp=sharing"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-tertiary"
              >
                <FaDownload className="text-sm" />
                Download Full CV
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FaUser className="text-secondary" />
            <h2 className="text-2xl font-bold text-tertiary">
              Professional Summary
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-700">
            I&apos;m a Frontend Software Engineer with extensive experience
            crafting immersive digital experiences. I have a proven track record
            of impactful projects across a variety of industries. I&apos;m
            specialized in web development using JavaScript&apos;s modern
            frameworks like React. My expertise lies in using cutting-edge
            technology to create complex and user-friendly solutions.
          </p>
        </div>

        {/* Work Experience Section */}
        <WorkExperiences />
      </div>
    </div>
  );
}
