import { format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { FC } from 'react';
import { type CalendarState, useCalendar } from '../hooks/use-calendar';

export const CalendarMonth: FC = () => {
  const { month, year, setMonth, setYear } = useCalendar();
  const monthName = format(new Date(year, month), 'MMMM');

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
    <div className="flex items-center justify-between p-3">
      <p className="font-medium text-sm">{`${monthName}, ${year}`}</p>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => handlePreviousMonth()}>
          <ChevronLeftIcon size={16} />
        </button>
        <button type="button" onClick={() => handleNextMonth()}>
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </div>
  );
};
