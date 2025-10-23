import type * as React from 'react';
import type { ComponentProps } from 'react';

import { cn } from '@/libs/utils';

export function Section({
  children,
  className,
  ...props
}: ComponentProps<'section'> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('p-8 pt-16 pb-16', className)} {...props}>
      {children}
    </section>
  );
}
