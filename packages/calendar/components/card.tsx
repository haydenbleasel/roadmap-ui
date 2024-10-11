import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { Feature } from '@roadmap-ui/types';
import type { FC } from 'react';
import { useCalendar } from '../hooks/use-calendar';

export const CalendarCard: FC<Feature> = ({
  startAt,
  endAt,
  status: { color },
  name,
}) => {
  const { month, year } = useCalendar();

  const isWithinMonth = () => {
    const startDate = new Date(startAt);
    const endDate = new Date(endAt);
    const currentMonthStart = new Date(year, month, 1);
    const currentMonthEnd = new Date(year, month + 1, 0);

    return (
      (startDate >= currentMonthStart && startDate <= currentMonthEnd) ||
      (endDate >= currentMonthStart && endDate <= currentMonthEnd) ||
      (startDate <= currentMonthStart && endDate >= currentMonthEnd)
    );
  };

  if (!isWithinMonth()) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute top-0 right-0 left-0 flex items-center justify-between overflow-hidden rounded-sm p-1 text-xs'
      )}
      style={{
        backgroundColor: color,
        color: '#fff',
        gridRowStart: 2,
        gridColumnStart: 2,
      }}
    >
      <div className="font-semibold">{name}</div>
      <div className="text-xxs">{startAt.toLocaleDateString()}</div>
      <div className="text-xxs">{endAt.toLocaleDateString()}</div>
    </div>
  );
};
