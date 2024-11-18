'use client';

import { cn } from '@/lib/utils';
import {
  DndContext,
  type DragEndEvent,
  rectIntersection,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import type { ReactNode } from 'react';

type Status = {
  id: string;
  name: string;
  color: string;
};

type Feature = {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: Status;
};

export type ListGroupProps = Status & {
  children: ReactNode;
  className?: string;
};

export const ListGroup = ({
  id,
  name,
  color,
  children,
  className,
}: ListGroupProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className={cn(
        'bg-secondary transition-colors',
        isOver && 'bg-foreground/10',
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-2 bg-foreground/5 p-3">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <p className="m-0 font-semibold text-sm">{name}</p>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3" ref={setNodeRef}>
        {children}
      </div>
    </div>
  );
};

export type ListItemProps = Pick<Feature, 'id' | 'name'> & {
  readonly index: number;
  readonly parent: string;
  readonly children?: ReactNode;
  readonly className?: string;
};

export const ListItem = ({
  id,
  name,
  index,
  parent,
  children,
  className,
}: ListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { index, parent },
    });

  return (
    <div
      className={cn(
        'flex cursor-grab items-center gap-2 rounded-md border bg-background p-2 shadow-sm',
        isDragging && 'cursor-grabbing',
        className
      )}
      style={{
        transform: transform
          ? `translateX(${transform.x}px) translateY(${transform.y}px)`
          : 'none',
      }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      {children ?? <p className="m-0 font-medium text-sm">{name}</p>}
    </div>
  );
};

export type ListProviderProps = {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  className?: string;
};

export const ListProvider = ({
  children,
  onDragEnd,
  className,
}: ListProviderProps) => (
  <DndContext
    collisionDetection={rectIntersection}
    onDragEnd={onDragEnd}
    modifiers={[restrictToVerticalAxis]}
  >
    <div className={cn('flex flex-col', className)}>{children}</div>
  </DndContext>
);
