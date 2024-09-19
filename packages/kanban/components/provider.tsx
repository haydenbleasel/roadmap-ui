'use client';

import { DndContext, rectIntersection } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { cn } from '@repo/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type KanbanProviderProps = {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  className?: string;
};

export const KanbanProvider: FC<KanbanProviderProps> = ({
  children,
  onDragEnd,
  className,
}) => (
  <DndContext collisionDetection={rectIntersection} onDragEnd={onDragEnd}>
    <div className={cn('flex items-stretch gap-2', className)}>{children}</div>
  </DndContext>
);
