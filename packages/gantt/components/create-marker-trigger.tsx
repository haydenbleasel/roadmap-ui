import { useMouse, useThrottle, useWindowScroll } from '@uidotdev/usehooks';
import { formatDate } from 'date-fns';
import { PlusIcon } from 'lucide-react';
import { type FC, useContext } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { getDateByMousePosition } from '../lib/utils';

type CreateMarkerTriggerProps = {
  onCreateMarker: (date: Date) => void;
};

export const CreateMarkerTrigger: FC<CreateMarkerTriggerProps> = ({
  onCreateMarker,
}) => {
  const gantt = useContext(GanttContext);
  const [mousePosition, mouseRef] = useMouse<HTMLDivElement>();
  const [windowScroll] = useWindowScroll();
  const x = useThrottle(
    mousePosition.x -
      (mouseRef.current?.getBoundingClientRect().x ?? 0) -
      (windowScroll.x ?? 0),
    10
  );

  const date = getDateByMousePosition(gantt, x);

  const handleClick = () => {
    onCreateMarker(date);
  };

  return (
    <div
      className="group pointer-events-none absolute top-0 left-0 h-full w-full select-none overflow-visible"
      ref={mouseRef}
    >
      <div
        className="-ml-2 pointer-events-auto sticky top-6 z-20 flex w-4 flex-col items-center justify-center gap-1 overflow-visible opacity-0 group-hover:opacity-100"
        style={{ transform: `translateX(${x}px)` }}
      >
        <button
          type="button"
          className="z-50 inline-flex h-4 w-4 items-center justify-center rounded-full bg-card"
          onClick={handleClick}
        >
          <PlusIcon size={12} className="text-muted-foreground" />
        </button>
        <div className="whitespace-nowrap rounded-full border border-border/50 bg-background/90 px-2 py-1 text-foreground text-xs backdrop-blur-lg">
          {formatDate(date, 'MMM dd, yyyy')}
        </div>
      </div>
    </div>
  );
};
