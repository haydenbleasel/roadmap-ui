import { useDraggable } from '@dnd-kit/core';
import { Card } from '@roadmap-ui/shadcn-ui/components/ui/card';
import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { Feature } from '@roadmap-ui/types';
import { type FC, type ReactNode, useEffect } from 'react';
import { useGantt } from '../hooks/use-gantt';

type FeatureItemCardProps = Pick<Feature, 'id'> & {
  children?: ReactNode;
};

export const FeatureItemCard: FC<FeatureItemCardProps> = ({ id, children }) => {
  const { setDragging } = useGantt();
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  const isPressed = Boolean(attributes['aria-pressed']);

  useEffect(() => setDragging(isPressed), [isPressed, setDragging]);

  return (
    <Card className="h-full w-full rounded-md bg-background p-2 text-xs shadow-sm">
      <div
        className={cn(
          'flex h-full w-full items-center justify-between gap-2 text-left',
          isPressed && 'cursor-grabbing'
        )}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
      >
        {children}
      </div>
    </Card>
  );
};
