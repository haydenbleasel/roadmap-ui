import { DndContext, rectIntersection } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type ListProviderProps = {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  className?: string;
};

export const ListProvider: FC<ListProviderProps> = ({
  children,
  onDragEnd,
  className,
}) => (
  <DndContext
    collisionDetection={rectIntersection}
    onDragEnd={onDragEnd}
    modifiers={[restrictToVerticalAxis]}
  >
    <div className={cn('flex flex-col', className)}>{children}</div>
  </DndContext>
);
