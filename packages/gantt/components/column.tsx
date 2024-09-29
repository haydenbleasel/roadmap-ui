import { cn } from '@repo/shadcn-ui/lib/utils';
import { type FC, useContext, useRef, useState } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { useGantt } from '../hooks/use-gantt';
import { useMouse } from '../hooks/use-mouse';
import { AddFeatureHelper } from './add-feature-helper';

type ColumnProps = {
  index: number;
  isColumnSecondary?: (item: number) => boolean;
};

export const Column: FC<ColumnProps> = ({ index, isColumnSecondary }) => {
  const gantt = useContext(GanttContext);
  const { dragging } = useGantt();
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouse(ref);
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  return (
    // biome-ignore lint/nursery/noStaticElementInteractions: <explanation>
    <div
      className={cn(
        'group relative h-full overflow-hidden',
        isColumnSecondary?.(index) ? 'bg-secondary' : ''
      )}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!dragging && hovering && gantt.onAddItem && gantt.editable ? (
        <AddFeatureHelper top={mouse.y} />
      ) : null}
    </div>
  );
};
