import { useDraggable } from '@dnd-kit/core';
import { Card } from '@repo/shadcn-ui/components/ui/card';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { type FC, type ReactNode, useContext, useEffect } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { useGantt } from '../hooks/use-gantt';
import type { Feature } from '../types/types';

type FeatureItemCardProps = Pick<Feature, 'id'> & {
  children?: ReactNode;
};

export const FeatureItemCard: FC<FeatureItemCardProps> = ({ id, children }) => {
  const gantt = useContext(GanttContext);
  const { setDragging } = useGantt();
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    disabled: !gantt.editable,
  });
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
