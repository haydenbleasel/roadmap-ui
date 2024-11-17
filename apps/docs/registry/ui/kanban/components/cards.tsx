import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type KanbanCardsProperties = {
  children: ReactNode;
  className?: string;
};

export const KanbanCards: FC<KanbanCardsProperties> = ({
  children,
  className,
}) => (
  <div className={cn('flex flex-1 flex-col gap-2', className)}>{children}</div>
);
