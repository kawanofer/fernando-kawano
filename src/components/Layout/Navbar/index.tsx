'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { Language, useTranslation } from '@/libs/translations';

import MobileMenu from './mobile-menu';
import kawHeadIcon from '/public/kawa-head-icon.svg';

const FLAG = { en: '/en.png', pt: '/br.png' };
const LABEL = { en: 'EN', pt: 'PT' };
const NEXT: Record<Language, Language> = { en: 'pt', pt: 'en' };

export default function Navigation() {
  const { t, language, changeLanguage } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('');

  const menuList = [
    { label: t('nav.about'), href: '/#aboutme', id: 'aboutme' },
    { label: t('nav.education'), href: '/#education', id: 'education' },
    { label: t('nav.projects'), href: '/Projects', id: '' },
    { label: t('nav.skills'), href: '/#skills', id: 'skills' },
    { label: t('nav.contact'), href: '/#contact', id: 'contact' },
  ];

  // Section IDs are static strings — the effect runs once on mount intentionally.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const sectionIds = menuList.map(m => m.id).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav
      id="navigation"
      className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4 text-xl md:flex-nowrap md:py-6 lg:py-10"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Floating pill — desktop */}
      <div className="fixed inset-x-0 top-4 z-50 hidden justify-center md:flex">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="border-border bg-background-2/90 flex items-center gap-5 rounded-full border px-5 py-2 shadow-lg backdrop-blur-md"
        >
          {/* Logo */}
          <Link href="/" aria-label="Fernando Kawano - Home">
            <Image
              src={kawHeadIcon}
              width={32}
              height={32}
              alt="Fernando Kawano logo"
              className="rounded-full transition-opacity hover:opacity-75"
              priority
              sizes="32px"
            />
          </Link>

          {/* Separator */}
          <div className="bg-border h-4 w-px" aria-hidden="true" />

          {/* Nav links */}
          <div className="flex items-center gap-1" role="menubar">
            {menuList.map(menu => {
              const isActive = menu.id && activeSection === menu.id;
              return (
                <Link
                  key={menu.label}
                  href={menu.href}
                  role="menuitem"
                  aria-label={`Navigate to ${menu.label}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm transition-colors duration-200 ${
                    isActive
                      ? 'bg-card text-tertiary font-medium'
                      : 'text-secondary hover:text-text'
                  }`}
                >
                  {menu.label}
                </Link>
              );
            })}
          </div>

          {/* Separator */}
          <div className="bg-border h-4 w-px" aria-hidden="true" />

          {/* Language toggle */}
          <button
            type="button"
            onClick={() => changeLanguage(NEXT[language])}
            className="border-border bg-card text-secondary hover:text-text flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors duration-200"
            title={
              language === 'en' ? 'Mudar para Português' : 'Switch to English'
            }
            aria-label={
              language === 'en'
                ? 'Switch language to Portuguese'
                : 'Mudar idioma para Inglês'
            }
          >
            <Image
              src={FLAG[language]}
              alt={language === 'en' ? 'English flag' : 'Brazilian flag'}
              width={18}
              height={18}
              className="rounded-sm"
            />
            <span className="font-medium">{LABEL[language]}</span>
          </button>
        </motion.div>
      </div>

      {/* Mobile header — unchanged behaviour */}
      <div className="border-border bg-background-2/90 fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b p-3 backdrop-blur-md md:hidden">
        <Link href="/" aria-label="Fernando Kawano - Home">
          <Image
            src={kawHeadIcon}
            width={40}
            height={40}
            alt="Fernando Kawano logo"
            className="rounded-full"
            priority
            sizes="40px"
          />
        </Link>
        <MobileMenu menu={menuList} />
      </div>
    </nav>
  );
}
