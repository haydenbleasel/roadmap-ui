import type { FC, ReactNode } from 'react';

type CalendarContentProps = {
  children: ReactNode;
};

export const CalendarContent: FC<CalendarContentProps> = ({ children }) => (
  <div
    className="absolute top-[84px] right-0 bottom-0 left-0 grid grid-cols-7"
    style={{
      gridAutoRows: 100,
    }}
  >
    {children}
  </div>
);
