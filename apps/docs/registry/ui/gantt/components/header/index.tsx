import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import { type FC, useContext } from 'react';
import { GanttContext } from '../../contexts/gantt-context';
import type { Range } from '../../types/types';
import { DailyHeader } from './daily';
import { MonthlyHeader } from './monthly';
import { QuarterlyHeader } from './quarterly';

const headers: Record<Range, FC> = {
  daily: DailyHeader,
  monthly: MonthlyHeader,
  quarterly: QuarterlyHeader,
};

type HeaderProps = {
  className?: string;
};

export const Header: FC<HeaderProps> = ({ className }) => {
  const gantt = useContext(GanttContext);
  const Header = headers[gantt.range];

  return (
    <div
      className={cn(
        '-space-x-px flex h-full w-max divide-x divide-border/50',
        className
      )}
    >
      <Header />
    </div>
  );
};
