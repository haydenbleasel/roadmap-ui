import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type TimelineProps = {
  children: ReactNode;
  className?: string;
};

export const Timeline: FC<TimelineProps> = ({ children, className }) => (
  <div
    className={cn(
      'relative flex h-full w-max flex-none overflow-clip',
      className
    )}
  >
    {children}
  </div>
);
