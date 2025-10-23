'use client';

import React from 'react';

import Link from 'next/link';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useTranslation } from '@/libs/translations';

export default function Contact() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'GitHub',
      handle: '@kawanofer',
      url: 'https://github.com/kawanofer',
      icon: FaGithub,
      description: t('contact.gitHubDescription'),
    },
    {
      name: 'LinkedIn',
      handle: 'fernandokawano',
      url: 'https://www.linkedin.com/in/fernandokawano/',
      icon: FaLinkedin,
      description: t('contact.linkedInDescription'),
    },
  ];

  return (
    <Section id="contact">
      <SectionTitle title={t('contact.title')} />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Contact Information */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-tertiary text-xl font-semibold sm:text-2xl">
              {t('contact.getInTouch')}
            </h3>
            <p className="text-tertiary text-base leading-relaxed sm:text-lg">
              {t('contact.description')}
            </p>
          </div>

          {/* Email Contact */}
          <div className="space-y-4">
            <Link
              href="mailto:kawano.fer@gmail.com"
              className="text-foreground group hover:text-secondary focus:ring-tertiary flex items-center gap-2 rounded-md p-1 break-all transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none sm:gap-3 sm:break-normal"
              aria-label="Send email to Fernando Kawano at kawano.fer@gmail.com"
            >
              <span className="text-sm sm:text-base lg:text-lg">
                kawano.fer@gmail.com
              </span>
              <svg
                className="h-4 w-4 flex-shrink-0 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h3 className="text-tertiary mb-2 text-xl font-semibold sm:text-2xl">
              {t('contact.findMe')}
            </h3>
            <p className="text-tertiary text-sm sm:text-base">
              {t('contact.connectWithMe')}
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            {socialLinks.map(social => {
              const IconComponent = social.icon;
              return (
                <div key={social.name} className="group w-full sm:w-auto">
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background hover:bg-background-2 focus:ring-tertiary block w-full rounded-lg border border-gray-200 p-4 shadow-md transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none sm:p-6"
                    aria-label={`Visit ${social.name} profile - ${social.description} (opens in new tab)`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0" aria-hidden="true">
                        <IconComponent className="text-secondary group-hover:text-tertiary text-xl transition-colors duration-300 sm:text-2xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-medium text-white sm:text-lg">
                            {social.name}
                          </h4>
                          <HiOutlineExternalLink
                            className="group-hover:text-tertiary flex-shrink-0 text-sm text-gray-400 transition-colors duration-300 sm:text-base"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-secondary text-sm font-medium sm:text-base">
                          {social.handle}
                        </p>
                        <p className="text-tertiary mt-1 text-xs leading-relaxed sm:text-sm">
                          {social.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
