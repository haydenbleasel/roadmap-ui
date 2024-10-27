import type { Feature } from '@roadmap-ui/types/dist';
import type { FC } from 'react';
type CalendarItemProps = {
  feature: Feature;
};

export const CalendarItem: FC<CalendarItemProps> = ({ feature }) => (
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
