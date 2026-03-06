'use client';

import React from 'react';

import Link from 'next/link';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import { useTranslation } from '@/libs/translations';

import ContactForm from './ContactForm';

export default function Contact() {
  const { t } = useTranslation();
  const { ref: formRef, inView: formInView } = useScrollAnimation();
  const { ref: linksRef, inView: linksInView } = useScrollAnimation();
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
    {
      name: 'Email',
      handle: 'kawano.fer@gmail.com',
      url: 'mailto:kawano.fer@gmail.com',
      icon: HiOutlineExternalLink,
      description: t('contact.emailDescription'),
    },
  ];

  return (
    <Section id="contact">
      <SectionTitle title={t('contact.title')} />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* First Column: Contact Form */}
        <div
          ref={formRef}
          className={`transition-all duration-700 ${
            formInView
              ? 'translate-x-0 opacity-100'
              : '-translate-x-12 opacity-0'
          }`}
        >
          <ContactForm />
        </div>

        {/* Second Column: Social Links */}
        <div
          ref={linksRef}
          className={`space-y-8 transition-all delay-150 duration-700 sm:space-y-10 ${
            linksInView
              ? 'translate-x-0 opacity-100'
              : 'translate-x-12 opacity-0'
          }`}
        >
          {/* Social Links */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-tertiary mb-2 text-xl font-semibold sm:text-2xl">
              {t('contact.findMe')}
            </h3>
            <p className="text-tertiary text-sm sm:text-base">
              {t('contact.connectWithMe')}
            </p>

            <div className="flex flex-col items-stretch gap-4">
              {socialLinks.map(social => {
                const IconComponent = social.icon;
                return (
                  <div key={social.name} className="group w-full">
                    <Link
                      aria-label={`Visit ${social.name} profile - ${social.description} (opens in new tab)`}
                      className="bg-background hover:bg-background-2 block w-full rounded-lg border border-gray-200 p-4 shadow-md transition-all duration-300 hover:shadow-lg sm:p-4"
                      href={social.url}
                      rel="noopener noreferrer"
                      target="_blank"
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
      </div>
    </Section>
  );
}
