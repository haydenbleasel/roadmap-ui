import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { Status } from '@roadmap-ui/types';
import type { FC, ReactNode } from 'react';

type KanbanHeaderProperties =
  | {
      children: ReactNode;
    }
  | {
      name: Status['name'];
      color: Status['color'];
      className?: string;
    };

export const KanbanHeader: FC<KanbanHeaderProperties> = (props) =>
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
