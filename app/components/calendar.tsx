'use client';

import { exampleFeatures } from '@/lib/content';
import * as Calendar from '@/registry/ui/calendar';
import type { FC } from 'react';

export const CalendarExample: FC = () => (
  <Calendar.CalendarProvider>
    <Calendar.CalendarDate>
      <Calendar.CalendarDateLabel />
      <Calendar.CalendarDatePagination />
    </Calendar.CalendarDate>
    <Calendar.CalendarHeader />
    <Calendar.CalendarBody features={exampleFeatures}>
      {({ feature }) => (
        <Calendar.CalendarItem key={feature.id} feature={feature} />
      )}
    </Calendar.CalendarBody>
  </Calendar.CalendarProvider>
);
