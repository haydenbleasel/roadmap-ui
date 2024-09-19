import { cn } from '@repo/shadcn-ui/lib/utils';
import {} from 'date-fns';
import type { FC } from 'react';
import { useCalendar } from '../hooks/use-calendar';

type Feature = {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: {
    id: string;
    name: string;
    color: string;
  };
  group: {
    id: string;
    name: string;
  };
  product: {
    id: string;
    name: string;
  };
  owner: {
    id: string;
    image: string;
    name: string;
  };
  initiative: {
    id: string;
    name: string;
  };
  release: {
    id: string;
    name: string;
  };
};

type CalendarCardProps = Feature & {};

export const CalendarCard: FC<CalendarCardProps> = ({
  startAt,
  endAt,
  status: { color },
  name,
  owner: { image, name: ownerName },
  product: { name: productName },
  initiative: { name: initiativeName },
  release: { name: releaseName },
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
        'absolute top-0 left-0 right-0 top-8 flex items-center justify-between text-xs p-1 overflow-hidden rounded-sm'
      )}
      style={{
        backgroundColor: color,
        color: '#fff',
        gridRowStart: 2,
        gridColumnStart: 2,
      }}
    >
      <div className="font-semibold">{name}</div>
      <div className="text-xxs">{ownerName}</div>
      <div className="text-xxs">{startAt.toLocaleDateString()}</div>
      <div className="text-xxs">{endAt.toLocaleDateString()}</div>
    </div>
  );
};
