import { useDraggable } from '@dnd-kit/core';
import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { Feature } from '@roadmap-ui/types';
import type { FC, ReactNode } from 'react';

type ListItemProps = Pick<Feature, 'id' | 'name'> & {
  readonly index: number;
  readonly parent: string;
  readonly children?: ReactNode;
  readonly className?: string;
};

export const ListItem: FC<ListItemProps> = ({
  id,
  name,
  index,
  parent,
  children,
  className,
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
