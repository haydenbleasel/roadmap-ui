import { useDraggable } from '@dnd-kit/core';
import { cn } from '@repo/shadcn-ui/lib/utils';
import type { Feature } from '@repo/types';
import type { FC, ReactNode } from 'react';

type KanbanCardProps = Pick<Feature, 'id' | 'name' | 'status'> & {
  index: number;
  parent: string;
  children?: ReactNode;
};

export const KanbanCard: FC<KanbanCardProps> = ({
  id,
  name,
  index,
  parent,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { index, parent },
    });

  return (
    <div
      className={cn(
        'flex cursor-grab items-center gap-2 rounded-md border bg-background p-2 shadow-sm',
        isDragging && 'cursor-grabbing'
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
