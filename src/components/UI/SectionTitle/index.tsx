import React from 'react';

import { cn } from '@/libs/utils';

type TitleProps = {
  title: string;
  className?: string;
};

export default function SectionTitle({
  title,
  className,
}: Readonly<TitleProps>) {
  return (
    <h2 className={cn('relative pb-8 text-4xl font-bold', className)}>
      {title}
    </h2>
  );
}
