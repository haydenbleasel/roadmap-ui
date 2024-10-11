'use client';

import { cn } from '@repo/shadcn-ui/lib/utils';
import { getDaysInMonth } from 'date-fns';
import throttle from 'lodash.throttle';
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { type FC, useRef } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { useGantt } from '../hooks/use-gantt';
import { createInitialTimelineData } from '../lib/data';
import type { Range, TimelineData } from '../types/types';

export type ProviderProperties = {
  range?: Range;
  zoom?: number;
  onAddItem?: (date: Date) => void;
  editable?: boolean;
  children: ReactNode;
  className?: string;
};

export const Provider: FC<ProviderProperties> = ({
  zoom = 100,
  range = 'monthly',
  onAddItem,
  editable = false,
  children,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timelineData, setTimelineData] = useState<TimelineData>(
    createInitialTimelineData(new Date())
  );
  const { setScrollX } = useGantt();
  const sidebarElement = scrollRef.current?.querySelector(
    '[data-roadmap-ui="gantt-sidebar"]'
  );

  const headerHeight = 60;
  const sidebarWidth = sidebarElement ? 300 : 0;
  const rowHeight = 36;
  let columnWidth = 50;

  if (range === 'monthly') {
    columnWidth = 150;
  } else if (range === 'quarterly') {
    columnWidth = 100;
  }

  const cssVariables = {
    '--gantt-zoom': `${zoom}`,
    '--gantt-column-width': `${(zoom / 100) * columnWidth}px`,
    '--gantt-header-height': `${headerHeight}px`,
    '--gantt-row-height': `${rowHeight}px`,
    '--gantt-sidebar-width': `${sidebarWidth}px`,
  } as CSSProperties;

  // biome-ignore lint/correctness/useExhaustiveDependencies: Re-render when props change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft =
        scrollRef.current.scrollWidth / 2 - scrollRef.current.clientWidth / 2;
      setScrollX(scrollRef.current.scrollLeft);
    }
  }, [range, zoom, setScrollX]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: "Throttled"
  const handleScroll = useCallback(
    throttle(() => {
      if (!scrollRef.current) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollX(scrollLeft);

      if (scrollLeft === 0) {
        // Extend timelineData to the past
        const firstYear = timelineData[0]?.year;

        if (!firstYear) {
          return;
        }

        const newTimelineData: TimelineData = [...timelineData];
        newTimelineData.unshift({
          year: firstYear - 1,
          quarters: new Array(4).fill(null).map((_, quarterIndex) => ({
            months: new Array(3).fill(null).map((_, monthIndex) => {
              const month = quarterIndex * 3 + monthIndex;
              return {
                days: getDaysInMonth(new Date(firstYear, month, 1)),
              };
            }),
          })),
        });

        setTimelineData(newTimelineData);

        // Scroll a bit forward so it's not at the very start
        scrollRef.current.scrollLeft = scrollRef.current.clientWidth;
        setScrollX(scrollRef.current.scrollLeft);
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        // Extend timelineData to the future
        const lastYear = timelineData[timelineData.length - 1]?.year;

        if (!lastYear) {
          return;
        }

        const newTimelineData: TimelineData = [...timelineData];
        newTimelineData.push({
          year: lastYear + 1,
          quarters: new Array(4).fill(null).map((_, quarterIndex) => ({
            months: new Array(3).fill(null).map((_, monthIndex) => {
              const month = quarterIndex * 3 + monthIndex;
              return {
                days: getDaysInMonth(new Date(lastYear, month, 1)),
              };
            }),
          })),
        });

        setTimelineData(newTimelineData);

        // Scroll a bit back so it's not at the very end
        scrollRef.current.scrollLeft =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        setScrollX(scrollRef.current.scrollLeft);
      }
    }, 100),
    [timelineData, setScrollX]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <GanttContext.Provider
      value={{
        zoom,
        range,
        headerHeight,
        columnWidth,
        sidebarWidth,
        rowHeight,
        onAddItem,
        timelineData,
        placeholderLength: 2,
        editable,
        ref: scrollRef,
      }}
    >
      <div
        className={cn(
          'gantt relative grid h-full w-full flex-none select-none overflow-auto rounded-sm bg-secondary',
          range,
          className
        )}
        style={{
          ...cssVariables,
          gridTemplateColumns: 'var(--gantt-sidebar-width) 1fr',
        }}
        ref={scrollRef}
      >
        {children}
      </div>
    </GanttContext.Provider>
  );
};
