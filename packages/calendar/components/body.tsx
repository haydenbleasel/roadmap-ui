import { cn } from '@repo/shadcn-ui/lib/utils';
import type { Feature } from '@repo/types';
import { getDay, getDaysInMonth, isSameDay } from 'date-fns';
import type { FC, ReactNode } from 'react';
import { useCalendar } from '../hooks/use-calendar';

const OutOfBoundsDay: FC<{ day: number }> = ({ day }) => {
  return (
    <div className="relative h-full w-full bg-secondary p-1 text-muted-foreground text-xs">
      {day}
    </div>
  );
};

type CalendarBodyProps = {
  features: Feature[];
};

export const CalendarBody: FC<CalendarBodyProps> = ({ features }) => {
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
          {featuresForDay.slice(0, 3).map((feature) => (
            <div className="flex items-center gap-2" key={feature.id}>
              <div
                className="h-2 w-2 rounded-full shrink-0"
                style={{
                  backgroundColor: feature.status.color,
                }}
              />
              <span className="truncate">{feature.name}</span>
            </div>
          ))}
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
