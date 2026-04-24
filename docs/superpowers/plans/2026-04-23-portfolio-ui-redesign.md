# Portfolio UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace CSS transition animations with Framer Motion, redesign the Navbar as a floating pill, add tech icons to Skills pills, replace the Education section with a click-to-expand timeline, and add hover interactions to Projects cards.

**Architecture:** Framer Motion is added as the single animation driver. `useScrollAnimation` is retired in favour of Framer Motion's `whileInView` prop and `useReducedMotion` hook. Each section is updated independently so they can be committed and tested in isolation.

**Tech Stack:** Next.js 15, React 19, Framer Motion, Tailwind CSS 4, react-icons (already installed)

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Modify | `package.json` | Add `framer-motion` |
| Modify | `src/components/Layout/Navbar/index.tsx` | Floating pill navbar + compact language toggle |
| Create | `src/libs/skillIcons.tsx` | Icon mapping for all 36 skills |
| Modify | `src/components/Sections/Skills/Pill/index.tsx` | Accept `icon` prop, Framer Motion `whileHover` |
| Modify | `src/components/Sections/Skills/index.tsx` | Staggered scroll entrance via Framer Motion |
| Modify | `src/components/Sections/Hero/index.tsx` | Replace `useScrollAnimation` with Framer Motion |
| Modify | `src/components/Sections/AboutMe/index.tsx` | Replace `useScrollAnimation` with Framer Motion |
| Modify | `src/components/Sections/Education/index.tsx` | Full timeline redesign with `AnimatePresence` |
| Modify | `src/components/Sections/Contact/index.tsx` | Replace `useScrollAnimation` with Framer Motion |
| Modify | `src/app/Projects/page.tsx` | Add `motion` wrapper + hover interactions |

---

## Task 1: Install Framer Motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
npm install framer-motion
```

Expected output: `added 1 package` (or similar — framer-motion has no sub-dependencies in React 19 mode).

- [ ] **Step 2: Verify the build still passes**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install framer-motion"
```

---

## Task 2: Navbar — Floating Pill

**Files:**
- Modify: `src/components/Layout/Navbar/index.tsx`

The current navbar is a full-width fixed bar. Replace it with a centered floating pill with backdrop blur. The language switcher becomes a compact single-flag toggle (shows active language, click to switch).

- [ ] **Step 1: Replace the navbar implementation**

Replace the entire contents of `src/components/Layout/Navbar/index.tsx` with:

```tsx
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

  useEffect(() => {
    const sectionIds = menuList.map(m => m.id).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry?.isIntersecting) setActiveSection(id); },
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
          className="flex items-center gap-5 rounded-full border border-border bg-background-2/90 px-5 py-2 shadow-lg backdrop-blur-md"
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
          <div className="h-4 w-px bg-border" aria-hidden="true" />

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
                  className={`rounded-full px-3 py-1 text-sm transition-colors duration-200 ${
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
          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* Language toggle */}
          <button
            onClick={() => changeLanguage(NEXT[language])}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-sm text-secondary transition-colors duration-200 hover:text-text"
            title={language === 'en' ? 'Mudar para Português' : 'Switch to English'}
            aria-label={language === 'en' ? 'Switch language to Portuguese' : 'Mudar idioma para Inglês'}
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
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background-2/90 p-3 backdrop-blur-md md:hidden">
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
```

- [ ] **Step 2: Start dev server and verify visually**

```bash
npm run dev
```

Open http://localhost:3000. Confirm: floating pill appears at top center on desktop, mobile shows the original header + hamburger menu. Scroll down and verify the active link highlights.

- [ ] **Step 3: Commit**

```bash
git add src/components/Layout/Navbar/index.tsx
git commit -m "feat: replace navbar with floating pill"
```

---

## Task 3: Skill Icons Mapping

**Files:**
- Create: `src/libs/skillIcons.tsx`

Maps each skill string to a react-icons component. Skills without a matching icon get `null` (the Pill will render a fallback dot).

- [ ] **Step 1: Create the icon map**

Create `src/libs/skillIcons.tsx`:

```tsx
import {
  DiAngularSimple,
  DiBootstrap,
  DiCss3,
  DiFirebase,
  DiGit,
  DiHtml5,
  DiJavascript1,
  DiMongodb,
  DiMysql,
  DiNodejsSmall,
  DiReact,
  DiSass,
} from 'react-icons/di';
import {
  SiAzuredevops,
  SiFigma,
  SiJest,
  SiMicrosoftazure,
  SiNestjs,
  SiNextdotjs,
  SiPrisma,
  SiRedux,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
} from 'react-icons/si';

import type { IconType } from 'react-icons';

export const skillIcons: Record<string, IconType> = {
  JavaScript: DiJavascript1,
  TypeScript: SiTypescript,
  React: DiReact,
  'Next.js': SiNextdotjs,
  AngularJS: DiAngularSimple,
  Redux: SiRedux,
  'Styled-components': SiStyledcomponents,
  'Tailwind CSS': SiTailwindcss,
  // Material-UI has no icon in react-icons — falls back to dot in Pill
  Bootstrap: DiBootstrap,
  'Node.js': DiNodejsSmall,
  NestJS: SiNestjs,
  Prisma: SiPrisma,
  MongoDB: DiMongodb,
  Firebase: DiFirebase,
  MySQL: DiMysql,
  Jest: SiJest,
  Vite: SiVite,
  Webpack: SiWebpack,
  Git: DiGit,
  Azure: SiMicrosoftazure,
  'Azure DevOps': SiAzuredevops,
  HTML5: DiHtml5,
  CSS3: DiCss3,
  Figma: SiFigma,
  SASS: DiSass,
};
```

- [ ] **Step 2: Verify the import compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/libs/skillIcons.tsx
git commit -m "feat: add skill icon mapping"
```

---

## Task 4: Skill Pill — Icon + Framer Motion Hover

**Files:**
- Modify: `src/components/Sections/Skills/Pill/index.tsx`
- Test: `src/components/Sections/Skills/Pill/__tests__/Pill.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/Sections/Skills/Pill/__tests__/Pill.test.tsx`:

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Pill from '../index';
import { DiReact } from 'react-icons/di';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('Pill', () => {
  it('renders the skill label', () => {
    render(<Pill value="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders an icon when provided', () => {
    render(<Pill value="React" icon={DiReact} />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders a fallback dot when no icon is provided', () => {
    render(<Pill value="Scrum" />);
    const dot = document.querySelector('[data-testid="pill-dot"]');
    expect(dot).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- --testPathPattern="Pill/__tests__/Pill.test"
```

Expected: FAIL — `icon` prop does not exist.

- [ ] **Step 3: Implement the updated Pill**

Replace `src/components/Sections/Skills/Pill/index.tsx`:

```tsx
import React from 'react';

import { motion } from 'framer-motion';

import type { IconType } from 'react-icons';

type PillProps = {
  value: string;
  icon?: IconType;
};

export default function Pill({ value, icon: Icon }: Readonly<PillProps>) {
  return (
    <motion.div
      className="bg-card flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-base text-secondary"
      whileHover={{
        y: -3,
        borderColor: 'var(--color-secondary)',
        color: 'var(--color-text)',
        boxShadow: '0 6px 18px rgba(67,85,133,0.3)',
      }}
      transition={{ duration: 0.15 }}
    >
      {Icon ? (
        <Icon size={18} aria-hidden="true" />
      ) : (
        <span
          data-testid="pill-dot"
          className="bg-secondary inline-block h-1.5 w-1.5 rounded-full"
          aria-hidden="true"
        />
      )}
      {value}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --testPathPattern="Pill/__tests__/Pill.test"
```

Expected: PASS — all 3 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/Sections/Skills/Pill/index.tsx src/components/Sections/Skills/Pill/__tests__/Pill.test.tsx
git commit -m "feat: add icon support and framer-motion hover to Pill"
```

---

## Task 5: Skills Section — Staggered Entrance

**Files:**
- Modify: `src/components/Sections/Skills/index.tsx`

Replace the CSS-based stagger with Framer Motion `whileInView` + `staggerChildren`.

- [ ] **Step 1: Replace Skills section**

Replace `src/components/Sections/Skills/index.tsx`:

```tsx
'use client';

import React from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { skillIcons } from '@/libs/skillIcons';
import { useTranslation } from '@/libs/translations';

import Pill from './Pill';

const mainSkills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'AngularJS',
  'SharePoint (SPFx)',
  'Redux (Saga/Thunk/Toolkit)',
  'Context API',
  'Styled-components',
  'Tailwind CSS',
  'Material-UI',
  'Bootstrap',
  'Responsive Web Design',
  'Accessibility',
  'Node.js',
  'NestJS',
  'Prisma',
  'REST API',
  'MongoDB',
  'Firebase',
  'MySQL',
  'Jest',
  'Unit Testing',
  'Code Review',
  'Clean Code',
  'Vite',
  'Webpack',
  'Git',
  'CI/CD',
  'Azure',
  'Azure DevOps',
  'Adobe XD',
  'Zeplin',
  'Jira',
  'Agile Methodologies',
  'Scrum',
  'Kanban',
];

export default function Skills() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.04,
      },
    },
  };

  const item = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <Section id="skills" className="bg-background-2">
      <SectionTitle title={t('skills.title')} />

      <motion.div
        className="flex flex-wrap gap-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
      >
        {mainSkills.map(skill => (
          <motion.div key={skill} variants={item}>
            <Pill value={skill} icon={skillIcons[skill]} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000, scroll to Skills. Pills should stagger in and show icons. Skills without icons (e.g. Scrum, Kanban) should show a small dot.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sections/Skills/index.tsx
git commit -m "feat: add staggered entrance and icons to Skills section"
```

---

## Task 6: Hero — Framer Motion Entrance

**Files:**
- Modify: `src/components/Sections/Hero/index.tsx`

Replace `useScrollAnimation` with Framer Motion `motion` components on mount.

- [ ] **Step 1: Replace animation in Hero**

Replace `src/components/Sections/Hero/index.tsx`:

```tsx
'use client';

import React from 'react';

import Image from 'next/image';

import { motion, useReducedMotion } from 'framer-motion';
import { FaCloudDownloadAlt } from 'react-icons/fa';

import Button from '@/components/UI/Button';
import { Section } from '@/components/UI/Section';

import { useTranslation } from '@/libs/translations';

import KawanoKanji from '/public/kawano-kanji.svg';

export default function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const handleOpenCV = () => {
    if (localStorage.getItem('language') === 'en') {
      window.open(
        'https://drive.google.com/file/d/1Hr9KCd0R1M77C6o5iDPC8n6SbjsI1HjT/view?usp=sharing',
        '_blank'
      );
      return;
    }
    window.open(
      'https://drive.google.com/file/d/1Ht85MjFojY6TnbW-1mpwUtnfI8859ZpW/view?usp=sharing',
      '_blank'
    );
  };

  const textVariants = {
    hidden: prefersReducedMotion ? {} : { x: -48, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: prefersReducedMotion ? {} : { x: 48, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } },
  };

  return (
    <Section
      className="flex justify-between"
      role="banner"
      aria-label="Hero introduction"
    >
      <motion.div
        className="flex w-full flex-col justify-between lg:w-auto"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="mb-8 text-center lg:text-left">
          <h1 className="text-bold color-text text-4xl sm:text-5xl">
            <span className="block">{t('hero.greeting')}</span>
            <span className="block">
              Fernando{' '}
              <span className="text-tertiary">
                <strong>Kawano</strong>
              </span>
            </span>
          </h1>
          <p
            className="pt-2 text-xl font-thin text-zinc-500 sm:text-2xl"
            role="doc-subtitle"
          >
            {t('hero.title')}
          </p>
          <p className="flex justify-center pt-2 text-base font-thin text-zinc-500 sm:text-lg lg:justify-start">
            {t('hero.location')}
          </p>
        </header>

        <div className="flex justify-center lg:justify-start">
          <Button
            icon={FaCloudDownloadAlt}
            onClick={handleOpenCV}
            className="flex w-48 items-center gap-3"
            aria-label="Download Fernando Kawano's CV (opens in new tab)"
          >
            {t('hero.downloadCV')}
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="hidden lg:block"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        role="img"
        aria-label="Decorative Japanese kanji symbol"
      >
        <Image
          alt="Decorative Japanese kanji symbol representing Fernando Kawano"
          className="rounded-full bg-white"
          priority={true}
          src={KawanoKanji}
          width={400}
          height={400}
          sizes="(max-width: 768px) 0px, (max-width: 1024px) 300px, 400px"
          style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmOWY5ZjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
        />
      </motion.div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Reload http://localhost:3000. Text slides in from left, kanji slides in from right on page load.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sections/Hero/index.tsx
git commit -m "feat: replace hero animations with framer-motion"
```

---

## Task 7: About Me — Framer Motion

**Files:**
- Modify: `src/components/Sections/AboutMe/index.tsx`

- [ ] **Step 1: Replace animation in AboutMe**

Replace `src/components/Sections/AboutMe/index.tsx`:

```tsx
'use client';

import React from 'react';

import Image from 'next/image';

import { motion, useReducedMotion } from 'framer-motion';
import { Tooltip } from '@mui/material';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useTranslation } from '@/libs/translations';

export default function AboutMe() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const photoVariants = {
    hidden: prefersReducedMotion ? {} : { x: -48, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const textVariants = {
    hidden: prefersReducedMotion ? {} : { x: 48, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } },
  };

  return (
    <Section id="aboutme" className="bg-background-2">
      <SectionTitle title={t('about.title')} />

      <div className="m-auto flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between">
        <motion.div
          className="mr-0 mb-14 flex items-center md:mr-16"
          variants={photoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
        >
          <Image
            className="bg-secondary rounded-full"
            src="/kawano.png"
            alt="Fernando Kawano picture"
            width={290}
            height={290}
            quality={100}
            sizes="(max-width: 768px) 290px, 290px"
          />
        </motion.div>

        <motion.div
          className="bg-background p-4 text-white md:w-4/5"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
        >
          <p className="text-lg leading-relaxed">
            {t('about.paragraph1')}
            <br /><br />
            {t('about.paragraph2')}
            <br /><br />
            {t('about.paragraph3')}
            <br /><br />
            {t('about.paragraph4')}
          </p>

          <div className="mt-5 flex gap-5">
            <div className="flex items-center gap-2">
              <Tooltip title={t('about.languages.portuguese')}>
                <Image
                  className="rounded-full"
                  src="/br.png"
                  alt="Brazilian flag"
                  width={20}
                  height={20}
                />
              </Tooltip>
              <p>{t('about.languages.level.native')}</p>
            </div>

            <div className="flex items-center gap-2">
              <Tooltip title={t('about.languages.english')}>
                <Image
                  className="rounded-full"
                  src="/en.png"
                  alt="English flag"
                  width={20}
                  height={20}
                />
              </Tooltip>
              <p>{t('about.languages.level.advanced')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Scroll down to About Me section. Photo slides in from left, text from right.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sections/AboutMe/index.tsx
git commit -m "feat: replace about-me animations with framer-motion"
```

---

## Task 8: Education — Click-to-Expand Timeline

**Files:**
- Modify: `src/components/Sections/Education/index.tsx`

Replace the logo+text list with a vertical timeline. Each entry expands on click via `AnimatePresence`. Only one entry is open at a time (accordion).

- [ ] **Step 1: Replace Education section**

Replace `src/components/Sections/Education/index.tsx`:

```tsx
'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useTranslation } from '@/libs/translations';

type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  institution: string;
  detail?: string;
  credentialUrl?: string;
};

type TimelineItemProps = TimelineEntry & {
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  prefersReducedMotion: boolean | null;
};

function TimelineItem({
  period,
  title,
  institution,
  detail,
  credentialUrl,
  isOpen,
  onToggle,
  index,
  prefersReducedMotion,
}: Readonly<TimelineItemProps>) {
  return (
    <motion.div
      className="relative pb-7 pl-8 last:pb-0"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
    >
      {/* Timeline dot */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group absolute left-0 top-1.5 flex h-3 w-3 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-primary bg-background transition-all duration-200 hover:border-tertiary hover:bg-tertiary hover:shadow-[0_0_12px_rgba(245,232,198,0.4)] focus-visible:outline-none"
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title}`}
      />

      <div
        className="cursor-pointer"
        onClick={onToggle}
        role="presentation"
      >
        <p className="mb-1 text-xs uppercase tracking-widest text-tertiary">
          {period}
        </p>
        <h3 className="text-base font-semibold text-text">{title}</h3>
        <p className="text-sm text-secondary">{institution}</p>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && detail && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-md border-l-2 border-tertiary bg-background-2 px-4 py-3 text-sm text-secondary">
              {detail}
              {credentialUrl && (
                <Link
                  href={credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-tertiary underline-offset-2 hover:underline"
                  onClick={e => e.stopPropagation()}
                >
                  See Credential ↗
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Education() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  const degrees: TimelineEntry[] = [
    {
      id: 'degree1',
      period: t('education.period1'),
      title: t('education.degree1'),
      institution: t('education.institution1'),
    },
    {
      id: 'degree2',
      period: t('education.period2'),
      title: t('education.degree2'),
      institution: t('education.institution2'),
    },
  ];

  const certifications: TimelineEntry[] = [
    {
      id: 'cert1',
      period: 'Apr 2019',
      title: 'Exam 480: Programming in HTML5 with JavaScript and CSS3',
      institution: 'Microsoft',
      detail: 'Microsoft certification validating proficiency in HTML5, JavaScript, and CSS3 for building modern web applications.',
      credentialUrl: 'https://www.credly.com/badges/f7f895da-db5b-4aea-92e7-787fe082a0fd/linked_in_profile',
    },
  ];

  return (
    <Section id="education">
      <SectionTitle title={t('education.title')} />

      {/* Timeline wrapper with gradient line */}
      <div className="relative pl-4">
        <div
          className="absolute left-4 top-0 h-full w-px"
          style={{
            background: 'linear-gradient(to bottom, #435585, #F5E8c6, #435585, #818FB4)',
          }}
          aria-hidden="true"
        />

        {degrees.map((entry, i) => (
          <TimelineItem
            key={entry.id}
            {...entry}
            isOpen={openId === entry.id}
            onToggle={() => toggle(entry.id)}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}

        {/* Certifications label */}
        <motion.p
          className="relative mb-4 pl-8 text-xs uppercase tracking-widest text-border"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: degrees.length * 0.15 }}
        >
          {t('education.certification')}
        </motion.p>

        {certifications.map((entry, i) => (
          <TimelineItem
            key={entry.id}
            {...entry}
            isOpen={openId === entry.id}
            onToggle={() => toggle(entry.id)}
            index={degrees.length + 1 + i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Scroll to Education. Entries stagger in. Click a dot or title — detail panel expands. Click again — collapses. Clicking one entry while another is open closes the first.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sections/Education/index.tsx
git commit -m "feat: replace education section with click-to-expand timeline"
```

---

## Task 9: Contact — Framer Motion Entrance

**Files:**
- Modify: `src/components/Sections/Contact/index.tsx`

- [ ] **Step 1: Replace animation in Contact**

Replace `src/components/Sections/Contact/index.tsx`:

```tsx
'use client';

import React from 'react';

import Link from 'next/link';

import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';

import { Section } from '@/components/UI/Section';
import SectionTitle from '@/components/UI/SectionTitle';

import { useTranslation } from '@/libs/translations';

import ContactForm from './ContactForm';

export default function Contact() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

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

  const formVariants = {
    hidden: prefersReducedMotion ? {} : { x: -48, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const linksVariants = {
    hidden: prefersReducedMotion ? {} : { x: 48, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } },
  };

  return (
    <Section id="contact">
      <SectionTitle title={t('contact.title')} />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
        >
          <ContactForm />
        </motion.div>

        <motion.div
          className="space-y-8 sm:space-y-10"
          variants={linksVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
        >
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
        </motion.div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Scroll to Contact. Form slides in from left, social links from right.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sections/Contact/index.tsx
git commit -m "feat: replace contact animations with framer-motion"
```

---

## Task 10: Projects Page — Hover Lift + Overlay

**Files:**
- Modify: `src/app/Projects/page.tsx`

Wrap each MUI Card in a `motion.div` for lift + shadow on hover. Add a hover overlay with Demo/GitHub buttons over the carousel.

- [ ] **Step 1: Add motion wrapper to project cards**

Add the Framer Motion import at the top of `src/app/Projects/page.tsx` alongside the existing imports:

```tsx
import { motion } from 'framer-motion';
```

Then replace the entire `{projects.map(project => (` JSX block (lines ~215–392 in the current file) with:

```tsx
{projects.map(project => (
  <motion.div
    key={project.title}
    whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(67,85,133,0.25)' }}
    transition={{ duration: 0.2 }}
  >
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CardContent sx={{ p: 4, pb: 0 }}>
        <div className="mb-6">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                {project.title}
              </h2>
              <div className="flex gap-2">
                <Chip
                  label={project.category}
                  size="medium"
                  color={getCategoryColor(project.category)}
                  variant="filled"
                  sx={{ fontWeight: 'medium' }}
                />
              </div>
            </div>
          </div>
        </div>

        {project?.images &&
          project.images.filter(img => img && img.trim() !== '').length > 0 && (
            <div className="mb-6">
              <Carousel
                images={project.images.filter(img => img && img.trim() !== '')}
              />
            </div>
          )}

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            {t('projects.description')}
          </h3>
          <p className="text-base leading-relaxed text-gray-700">
            {project.description}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            {t('projects.technologies')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <Chip
                key={techIndex}
                label={tech}
                size="medium"
                variant="outlined"
                sx={{
                  fontSize: '0.875rem',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    borderColor: 'primary.main',
                  },
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>

      <CardActions sx={{ p: 4, pt: 0, gap: 2 }}>
        <div className="flex w-full flex-wrap gap-3">
          {project.website && (
            <Tooltip title={t('projects.button.visit.website')} arrow>
              <Button
                size="small"
                startIcon={<Language />}
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                sx={{ minWidth: 140, fontWeight: 'medium' }}
              >
                {t('projects.button.visit.website')}
              </Button>
            </Tooltip>
          )}
          {project.githubProjectFrontend && (
            <Tooltip title="View Frontend Code" arrow>
              <Button
                size="medium"
                startIcon={<GitHub />}
                href={project.githubProjectFrontend}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{ minWidth: 140 }}
              >
                Frontend Code
              </Button>
            </Tooltip>
          )}
          {project.githubProjectBackend && (
            <Tooltip title="View Backend Code" arrow>
              <Button
                size="medium"
                startIcon={<Code />}
                href={project.githubProjectBackend}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{ minWidth: 140 }}
              >
                Backend Code
              </Button>
            </Tooltip>
          )}
          {project.githubUrl && (
            <Tooltip title="View Source Code" arrow>
              <Button
                size="medium"
                startIcon={<GitHub />}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{ minWidth: 140 }}
              >
                {t('projects.code')}
              </Button>
            </Tooltip>
          )}
          {project.liveUrl && (
            <Tooltip title="View Live Demo" arrow>
              <Button
                size="medium"
                startIcon={<OpenInNew />}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="success"
                sx={{ minWidth: 140 }}
              >
                {t('projects.liveDemo')}
              </Button>
            </Tooltip>
          )}
        </div>
      </CardActions>
    </Card>
  </motion.div>
))}
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:3000/Projects. Hover over project cards — they should lift slightly.

- [ ] **Step 3: Commit**

```bash
git add src/app/Projects/page.tsx
git commit -m "feat: add framer-motion hover lift to project cards"
```

---

## Task 11: Remove useScrollAnimation

**Files:**
- Modify: `src/hooks/useScrollAnimation.ts`

`useScrollAnimation` is no longer called by any component. Remove it to keep the codebase clean.

- [ ] **Step 1: Confirm no remaining usages**

```bash
grep -r "useScrollAnimation" src/
```

Expected: no output (zero matches).

- [ ] **Step 2: Delete the hook file**

```bash
rm src/hooks/useScrollAnimation.ts
```

- [ ] **Step 3: Run the full test suite**

```bash
npm test -- --watchAll=false
```

Expected: all tests pass.

- [ ] **Step 4: Run a production build**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused useScrollAnimation hook"
```
