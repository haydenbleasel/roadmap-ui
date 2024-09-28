'use client';

import { useDroppable } from '@dnd-kit/core';
import { cn } from '@repo/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';

type ListGroupProperties = {
  id: string;
  name: string;
  color: string;
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
      className={cn('', isOver ? 'outline-violet-500' : 'outline-transparent')}
    >
      <div className="flex shrink-0 items-center gap-2 bg-secondary p-3">
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
