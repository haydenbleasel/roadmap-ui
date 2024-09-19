'use client';

import { DndContext, rectIntersection } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
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
    <div className={className}>{children}</div>
  </DndContext>
);
