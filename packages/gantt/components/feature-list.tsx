import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type FeatureListProps = {
  className?: string;
  children: ReactNode;
};

export const FeatureList: FC<FeatureListProps> = ({ className, children }) => (
  <div
    className={cn('absolute top-0 left-0 h-full w-max space-y-4', className)}
    style={{ marginTop: 'var(--gantt-header-height)' }}
  >
    {children}
  </div>
);
