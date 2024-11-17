import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import { useMouse } from '@uidotdev/usehooks';
import { PlusIcon } from 'lucide-react';
import { type FC, useContext } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { useGantt } from '../hooks/use-gantt';
import { getDateByMousePosition } from '../lib/utils';

type AddFeatureHelperProps = {
  top: number;
  className?: string;
};

export const AddFeatureHelper: FC<AddFeatureHelperProps> = ({
  top,
  className,
}) => {
  const { scrollX } = useGantt();
  const gantt = useContext(GanttContext);
  const [mousePosition, mouseRef] = useMouse<HTMLDivElement>();

  const handleClick = () => {
    const ganttRect = gantt.ref?.current?.getBoundingClientRect();
    const x =
      mousePosition.x - (ganttRect?.left ?? 0) + scrollX - gantt.sidebarWidth;
    const currentDate = getDateByMousePosition(gantt, x);

    gantt.onAddItem?.(currentDate);
  };

  return (
    <div
      className={cn('absolute top-0 w-full px-0.5', className)}
      style={{
        marginTop: -gantt.rowHeight / 2,
        transform: `translateY(${top}px)`,
      }}
      ref={mouseRef}
    >
      <button
        onClick={handleClick}
        type="button"
        className="flex h-full w-full items-center justify-center rounded-md border border-dashed p-2"
      >
        <PlusIcon
          size={16}
          className="pointer-events-none select-none text-muted-foreground"
        />
      </button>
    </div>
  );
};
