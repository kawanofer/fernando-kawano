'use client';

import React from 'react';

import { useTranslation } from '@/libs/translations';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-background-2 fixed right-0 bottom-0 left-0 z-20 flex justify-center py-3 text-xs text-zinc-400 sm:text-sm">
      © 2025 Fernando Kawano. {t('footer.rights')}
    </footer>
  );
};

export default Footer;
