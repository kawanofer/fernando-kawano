'use client';

import React from 'react';

import { useTranslation } from '@/libs/translations';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-background-2 fixed right-0 bottom-0 left-0 flex justify-center py-3 text-zinc-400">
      © 2025 Fernando Kawano. {t('footer.rights')}
    </footer>
  );
};

export default Footer;
