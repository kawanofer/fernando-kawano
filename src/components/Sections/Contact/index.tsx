import React from 'react';

import Link from 'next/link';

import { AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';

import Title from '@/components/UI/Title';

export default function Contact() {
  const socialLinks = [
    {
      name: 'GitHub',
      handle: '@kawanofer',
      url: 'https://github.com/kawanofer',
      icon: FaGithub,
      description: 'View my code repositories and projects',
    },
    {
      name: 'LinkedIn',
      handle: 'fernandokawano',
      url: 'https://www.linkedin.com/in/fernandokawano/',
      icon: FaLinkedin,
      description: 'Professional network and career updates',
    },
  ];

  return (
    <section id="contact" className="rounded-md bg-background2 p-8 pb-16 pt-16">
      <Title title="Let's Connect" />

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-tertiary">
              Get in Touch
            </h3>
            <p className="text-lg leading-relaxed text-gray-600">
              I&apos;m always interested in new opportunities, collaborations,
              and conversations about technology, web development, and
              innovative projects. Let&apos;s create something amazing together!
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
              Find Me Elsewhere
            </h3>
            <p className="text-gray-600">Connect with me on these platforms</p>
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
                          <h4 className="text-lg font-medium text-tertiary">
                            {social.name}
                          </h4>
                          <HiOutlineExternalLink className="text-gray-400 transition-colors duration-300 group-hover:text-tertiary" />
                        </div>
                        <p className="font-medium text-secondary">
                          {social.handle}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
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
