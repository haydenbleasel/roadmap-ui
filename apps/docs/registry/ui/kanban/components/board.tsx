import { useDroppable } from '@dnd-kit/core';
import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { Status } from '@roadmap-ui/types';
import type { FC, ReactNode } from 'react';

type KanbanBoardProperties = {
  id: Status['id'];
  children: ReactNode;
  className?: string;
};

export const KanbanBoard: FC<KanbanBoardProperties> = ({
  id,
  children,
  className,
}) => {
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
