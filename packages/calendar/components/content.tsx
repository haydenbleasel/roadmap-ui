import type { FC, ReactNode } from 'react';

type CalendarContentProps = {
  children: ReactNode;
};

export const CalendarContent: FC<CalendarContentProps> = ({ children }) => (
  <div
    className="grid grid-cols-7 absolute bottom-0 left-0 right-0 top-[84px]"
    style={{
      gridAutoRows: 100,
    }}
  >
    {children}
  </div>
);
