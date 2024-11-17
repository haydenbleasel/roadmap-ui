'use client';

import {
  DndContext,
  rectIntersection,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { Feature, Status } from '@roadmap-ui/types';
import type { FC, ReactNode } from 'react';

export const KanbanBoard: FC<{
  id: Status['id'];
  children: ReactNode;
  className?: string;
}> = ({ id, children, className }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      className={cn(
        'flex h-full min-h-40 w-full flex-col gap-2 rounded-md border bg-secondary p-2 text-xs shadow-sm outline outline-2 transition-all',
        isOver ? 'outline-primary' : 'outline-transparent',
        className
      )}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export const KanbanCard: FC<
  Pick<Feature, 'id' | 'name'> & {
    index: number;
    parent: string;
    children?: ReactNode;
    className?: string;
  }
> = ({ id, name, index, parent, children, className }) => {
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

export const KanbanCards: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('flex flex-1 flex-col gap-2', className)}>{children}</div>
);

export const KanbanHeader: FC<
  | {
      children: ReactNode;
    }
  | {
      name: Status['name'];
      color: Status['color'];
      className?: string;
    }
> = (props) =>
  'children' in props ? (
    props.children
  ) : (
    <div className={cn('flex shrink-0 items-center gap-2', props.className)}>
      <div
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: props.color }}
      />
      <p className="m-0 font-semibold text-sm">{props.name}</p>
    </div>
  );

export const KanbanProvider: FC<{
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  className?: string;
}> = ({ children, onDragEnd, className }) => (
  <DndContext collisionDetection={rectIntersection} onDragEnd={onDragEnd}>
    <div className={cn('flex items-stretch gap-4', className)}>{children}</div>
  </DndContext>
);
