'use client';

import { DndContext, rectIntersection } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { cn } from '@repo/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type CalendarProviderProps = {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  className?: string;
};

export const CalendarProvider: FC<CalendarProviderProps> = ({
  children,
  onDragEnd,
  className,
}) => (
  <DndContext collisionDetection={rectIntersection} onDragEnd={onDragEnd}>
    <div className={cn('flex flex-col relative', className)}>{children}</div>
  </DndContext>
);
