import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import { useMouse, useThrottle, useWindowScroll } from '@uidotdev/usehooks';
import { type FC, useContext, useState } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { useGantt } from '../hooks/use-gantt';
import { AddFeatureHelper } from './add-feature-helper';

type ColumnProps = {
  index: number;
  isColumnSecondary?: (item: number) => boolean;
};

export const Column: FC<ColumnProps> = ({ index, isColumnSecondary }) => {
  const gantt = useContext(GanttContext);
  const { dragging } = useGantt();
  const [mousePosition, mouseRef] = useMouse<HTMLDivElement>();
  const [hovering, setHovering] = useState(false);
  const [windowScroll] = useWindowScroll();

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  const top = useThrottle(
    mousePosition.y -
      (mouseRef.current?.getBoundingClientRect().y ?? 0) -
      (windowScroll.y ?? 0),
    10
  );

  return (
    // biome-ignore lint/nursery/noStaticElementInteractions: <explanation>
    <div
      className={cn(
        'group relative h-full overflow-hidden',
        isColumnSecondary?.(index) ? 'bg-secondary' : ''
      )}
      ref={mouseRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!dragging && hovering && gantt.onAddItem ? (
        <AddFeatureHelper top={top} />
      ) : null}
    </div>
  );
};
