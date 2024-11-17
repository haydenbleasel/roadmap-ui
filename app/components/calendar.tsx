'use client';

import { exampleFeatures } from '@/lib/content';
import * as Calendar from '@roadmap-ui/calendar';
import type { FC } from 'react';

export const CalendarBasic: FC = () => (
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

export const CalendarWithoutMonth: FC = () => (
  <Calendar.CalendarProvider>
    <Calendar.CalendarHeader />
    <Calendar.CalendarBody features={exampleFeatures}>
      {({ feature }) => (
        <Calendar.CalendarItem key={feature.id} feature={feature} />
      )}
    </Calendar.CalendarBody>
  </Calendar.CalendarProvider>
);
