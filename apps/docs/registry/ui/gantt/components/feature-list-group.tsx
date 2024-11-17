import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type FeatureListGroupProps = {
  children: ReactNode;
  className?: string;
};

export const FeatureListGroup: FC<FeatureListGroupProps> = ({
  children,
  className,
}) => (
  <div
    className={cn('divide-y divide-transparent', className)}
    style={{ paddingTop: 'var(--gantt-row-height)' }}
  >
    {children}
  </div>
);
