'use client';

import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type CalendarProviderProps = {
  children: ReactNode;
  className?: string;
};

export const CalendarProvider: FC<CalendarProviderProps> = ({
  children,
  className,
}) => <div className={cn('relative flex flex-col', className)}>{children}</div>;
