'use client';

import { useDroppable } from '@dnd-kit/core';
import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { Status } from '@roadmap-ui/types';
import type { FC, ReactNode } from 'react';

type ListGroupProperties = Status & {
  children: ReactNode;
};

export const ListGroup: FC<ListGroupProperties> = ({
  id,
  name,
  color,
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className={cn(
        'bg-secondary transition-colors',
        isOver && 'bg-foreground/10'
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
