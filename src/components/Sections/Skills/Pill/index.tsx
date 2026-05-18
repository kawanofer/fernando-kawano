import React from 'react';

import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

type PillProps = {
  value: string;
  icon?: IconType;
  iconColor?: string;
};

export default function Pill({
  value,
  icon: Icon,
  iconColor,
}: Readonly<PillProps>) {
  return (
    <motion.div
      className="bg-card border-border text-secondary hover:border-secondary hover:text-text flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-base transition-[border-color,color,box-shadow] duration-150 hover:shadow-[0_6px_18px_rgba(67,85,133,0.3)]"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
    >
      {Icon ? (
        <Icon
          size={18}
          aria-hidden="true"
          style={iconColor ? { color: iconColor } : undefined}
        />
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
