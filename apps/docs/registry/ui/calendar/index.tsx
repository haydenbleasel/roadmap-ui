'use client';

import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import { format, getDay, getDaysInMonth, isSameDay } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { type CalendarState, useCalendar } from './use-calendar';

type Status = {
  id: string;
  name: string;
  color: string;
};

type Feature = {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: Status;
};

export type OutOfBoundsDayProps = {
  day: number;
};

export const OutOfBoundsDay = ({ day }: OutOfBoundsDayProps) => (
  <div className="relative h-full w-full bg-secondary p-1 text-muted-foreground text-xs">
    {day}
  </div>
);

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type CalendarBodyProps = {
  features: Feature[];
  children: (props: {
    feature: Feature;
  }) => ReactNode;
};

export const CalendarBody = ({ features, children }: CalendarBodyProps) => {
  const { month, year } = useCalendar();
  const daysInMonth = getDaysInMonth(new Date(year, month, 1));
  const firstDay = getDay(new Date(year, month, 1));
  const days: ReactNode[] = [];

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const prevMonthDays = getDaysInMonth(new Date(prevMonthYear, prevMonth, 1));
  const prevMonthDaysArray = Array.from(
    { length: prevMonthDays },
    (_, i) => i + 1
  );

  for (let i = 0; i < firstDay; i++) {
    const day = prevMonthDaysArray[prevMonthDays - firstDay + i];

    if (day) {
      days.push(<OutOfBoundsDay key={`prev-${i}`} day={day} />);
    }
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const featuresForDay = features.filter((feature) => {
      return isSameDay(new Date(feature.endAt), new Date(year, month, day));
    });

    days.push(
      <div
        key={day}
        className="relative h-full w-full p-1 text-muted-foreground text-xs flex flex-col gap-1"
      >
        {day}
        <div>
          {featuresForDay.slice(0, 3).map((feature) => children({ feature }))}
        </div>
        {featuresForDay.length > 3 && (
          <span className="text-xs text-muted-foreground block">
            +{featuresForDay.length - 3} more
          </span>
        )}
      </div>
    );
  }

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  const nextMonthDays = getDaysInMonth(new Date(nextMonthYear, nextMonth, 1));
  const nextMonthDaysArray = Array.from(
    { length: nextMonthDays },
    (_, i) => i + 1
  );

  const remainingDays = 7 - ((firstDay + daysInMonth) % 7);
  if (remainingDays < 7) {
    for (let i = 0; i < remainingDays; i++) {
      const day = nextMonthDaysArray[i];

      if (day) {
        days.push(<OutOfBoundsDay key={`next-${i}`} day={day} />);
      }
    }
  }

  return (
    <div className="grid flex-grow grid-cols-7">
      {days.map((day, index) => (
        <div
          key={index}
          className={cn(
            'relative aspect-square overflow-hidden border-t border-r',
            index % 7 === 6 && 'border-r-0'
          )}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export const CalendarDateLabel = () => {
  const { month, year } = useCalendar();
  const monthName = format(new Date(year, month), 'MMMM');

  return <p className="font-medium text-sm">{`${monthName}, ${year}`}</p>;
};

export const CalendarDatePagination = () => {
  const { month, year, setMonth, setYear } = useCalendar();

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth((month - 1) as CalendarState['month']);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth((month + 1) as CalendarState['month']);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => handlePreviousMonth()}>
        <ChevronLeftIcon size={16} />
      </button>
      <button type="button" onClick={() => handleNextMonth()}>
        <ChevronRightIcon size={16} />
      </button>
    </div>
  );
};

export type CalendarDateProps = {
  children: ReactNode;
};

export const CalendarDate = ({ children }: CalendarDateProps) => (
  <div className="flex items-center justify-between p-3">{children}</div>
);

export const CalendarHeader = () => (
  <div className="grid flex-grow grid-cols-7">
    {daysOfWeek.map((day) => (
      <div key={day} className="p-3 text-right text-muted-foreground text-xs">
        {day}
      </div>
    ))}
  </div>
);

export type CalendarItemProps = {
  feature: Feature;
};

export const CalendarItem = ({ feature }: CalendarItemProps) => (
  <div className="flex items-center gap-2" key={feature.id}>
    <div
      className="h-2 w-2 shrink-0 rounded-full"
      style={{
        backgroundColor: feature.status.color,
      }}
    />
    <span className="truncate">{feature.name}</span>
  </div>
);

export type CalendarProviderProps = {
  children: ReactNode;
  className?: string;
};

export const CalendarProvider = ({
  children,
  className,
}: CalendarProviderProps) => (
  <div className={cn('relative flex flex-col', className)}>{children}</div>
);
