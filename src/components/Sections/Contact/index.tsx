'use client';

import React from 'react';

import Link from 'next/link';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';

import Title from '@/components/UI/Title';

import { useTranslation } from '@/lib/translations';

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
    <section id="contact" className="rounded-md p-8 pb-16 pt-16">
      <Title title={t('contact.title')} />

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-tertiary">
              {t('contact.getInTouch')}
            </h3>
            <p className="text-lg leading-relaxed text-tertiary">
              {t('contact.description')}
            </p>
          </div>

          {/* Email Contact */}
          <div className="space-y-4">
            <Link
              href="mailto:kawano.fer@gmail.com"
              className="text-foreground group flex items-center gap-3 transition-colors duration-300 hover:text-secondary"
            >
              <span className="text-base sm:text-lg">kawano.fer@gmail.com</span>
              <svg
                className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-2xl font-semibold text-tertiary">
              {t('contact.findMe')}
            </h3>
            <p className="text-tertiary">{t('contact.connectWithMe')}</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map(social => {
              const IconComponent = social.icon;
              return (
                <div key={social.name} className="group">
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-gray-200 bg-background1 p-6 shadow-md transition-all duration-300 hover:bg-background2 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <IconComponent className="text-2xl text-secondary transition-colors duration-300 group-hover:text-tertiary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-white">
                            {social.name}
                          </h4>
                          <HiOutlineExternalLink className="text-gray-400 transition-colors duration-300 group-hover:text-tertiary" />
                        </div>
                        <p className="font-medium text-secondary">
                          {social.handle}
                        </p>
                        <p className="mt-1 text-sm text-tertiary">
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
    </section>
  );
}
