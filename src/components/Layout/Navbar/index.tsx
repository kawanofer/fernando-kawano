'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { LanguageSwitcher } from '@/components/UI';

import { useTranslation } from '@/libs/translations';

import MobileMenu from './mobile-menu';
import kawKanji from '/public/kawa-head-icon.svg';

export default function Navigation() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  const menuList = [
    {
      label: t('nav.about'),
      href: '/#aboutme',
    },
    {
      label: t('nav.education'),
      href: '/#education',
    },
    {
      label: t('nav.projects'),
      href: '/Projects',
    },
    {
      label: t('nav.skills'),
      href: '/#skills',
    },
    {
      label: t('nav.contact'),
      href: '/#contact',
    },
  ];

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setIsIntersecting(entry.isIntersecting);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={ref}
      id="navigation"
      className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4 text-xl md:flex-nowrap md:py-6 lg:py-10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`fixed inset-x-0 top-0 z-50 w-full border-b backdrop-blur duration-200 ${isIntersecting ? 'border-transparent bg-zinc-900/0' : 'border-zinc-800 bg-zinc-900/500'}`}
      >
        <div className="container mx-auto flex items-center justify-between p-2 md:p-4">
          <Link
            href="/"
            className="rounded-full font-black"
            aria-label="Fernando Kawano - Home"
          >
            <Image
              className="rounded-full p-2 transition-opacity duration-200 hover:opacity-75"
              src={kawKanji}
              width={50}
              height={50}
              alt="Fernando Kawano logo - Japanese kanji KAWA"
              priority={true} // Navigation logo should be priority
              sizes="50px"
            />
          </Link>

          <div className="block flex-none md:hidden">
            <MobileMenu menu={menuList} />
          </div>

          <div
            className="hidden justify-between gap-4 md:flex"
            role="menubar"
            aria-label="Main navigation menu"
          >
            {menuList.map(menu => (
              <Link
                key={menu.label}
                href={menu.href}
                className="rounded-md px-2 py-1 text-zinc-400 duration-200 hover:text-white"
                role="menuitem"
                aria-label={`Navigate to ${menu.label} section`}
              >
                {menu.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
