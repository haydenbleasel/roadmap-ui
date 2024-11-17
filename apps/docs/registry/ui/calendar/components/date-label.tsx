import { format } from 'date-fns';
import type { FC } from 'react';
import { useCalendar } from '../hooks/use-calendar';

export const CalendarDateLabel: FC = () => {
  const { month, year } = useCalendar();
  const monthName = format(new Date(year, month), 'MMMM');

  return <p className="font-medium text-sm">{`${monthName}, ${year}`}</p>;
};
