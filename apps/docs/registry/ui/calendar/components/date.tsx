import type { FC, ReactNode } from 'react';

type CalendarDateProps = {
  children: ReactNode;
};

export const CalendarDate: FC<CalendarDateProps> = ({ children }) => (
  <div className="flex items-center justify-between p-3">{children}</div>
);
