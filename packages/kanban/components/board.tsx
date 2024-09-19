'use client';

import { useDroppable } from '@dnd-kit/core';
import { cn } from '@repo/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type KanbanBoardProperties = {
  id: string;
  name: string;
  color: string;
  children: ReactNode;
};

export const KanbanBoard: FC<KanbanBoardProperties> = ({
  id,
  name,
  color,
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className={cn(
        'flex min-h-40 flex-col gap-2 rounded-lg bg-card p-2 outline outline-2 transition-all',
        isOver ? 'outline-violet-500' : 'outline-transparent'
      )}
    >
      <div className="flex shrink-0 items-center gap-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <p className="m-0 font-semibold text-sm">{name}</p>
      </div>
      <div className="flex flex-1 flex-col gap-2" ref={setNodeRef}>
        {children}
      </div>
    </div>
  );
};
