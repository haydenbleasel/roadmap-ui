'use client';

import { useDroppable } from '@dnd-kit/core';
import { Card } from '@repo/shadcn-ui/components/ui/card';
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
    <Card
      className={cn(
        'flex h-full min-h-40 w-full flex-col gap-2 rounded-md p-2 text-xs shadow-sm outline outline-2 transition-all',
        isOver ? 'outline-primary' : 'outline-transparent'
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
    </Card>
  );
};
