'use client';

import React from 'react';

import Image from 'next/image';

import { Language, useTranslation } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useTranslation();

  const handleLanguageChange = (lng: Language) => {
    changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors duration-200 hover:bg-zinc-800 ${
          language === 'en' ? 'bg-zinc-800' : ''
        }`}
        title="English"
      >
        <Image
          src="/en.png"
          alt="English flag"
          width={20}
          height={20}
          className="rounded-sm"
        />
        <span className="text-sm font-medium text-zinc-400">EN</span>
      </button>

      <button
        onClick={() => handleLanguageChange('pt')}
        className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors duration-200 hover:bg-zinc-800 ${
          language === 'pt' ? 'bg-zinc-800' : ''
        }`}
        title="Português (Brasil)"
      >
        <Image
          src="/br.png"
          alt="Brazilian flag"
          width={20}
          height={20}
          className="rounded-sm"
        />
        <span className="text-sm font-medium text-zinc-400">PT</span>
      </button>
    </div>
  );
}
