import type { FC } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarHeader: FC = () => (
  <div className="grid flex-grow grid-cols-7">
    {daysOfWeek.map((day) => (
      <div key={day} className="p-3 text-right text-muted-foreground text-xs">
        {day}
      </div>
    ))}
  </div>
);
