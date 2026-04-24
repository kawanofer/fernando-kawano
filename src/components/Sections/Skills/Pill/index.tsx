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
      className="bg-card border-border text-secondary flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-base"
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
