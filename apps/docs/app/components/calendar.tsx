'use client';

import { exampleFeatures } from '@/lib/content';
import * as Calendar from '@roadmap-ui/calendar';
import type { FC } from 'react';

export const CalendarExample: FC = () => {
  return (
    <Calendar.CalendarProvider onDragEnd={console.log}>
      <Calendar.CalendarMonth />
      <Calendar.CalendarHeader />
      <Calendar.CalendarBody />
      <Calendar.CalendarContent>
        {exampleFeatures.map((feature) => (
          <Calendar.CalendarCard key={feature.id} {...feature} />
        ))}
      </Calendar.CalendarContent>
    </Calendar.CalendarProvider>
  );
};
