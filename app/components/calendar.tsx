'use client';

import { exampleFeatures } from '@/lib/content';
import {
  CalendarBody,
  CalendarDate,
  CalendarDateLabel,
  CalendarDatePagination,
  CalendarHeader,
  CalendarItem,
  CalendarProvider,
} from '@/registry/roadmap-ui/calendar';
import type { FC } from 'react';

export const CalendarExample: FC = () => (
  <CalendarProvider>
    <CalendarDate>
      <CalendarDateLabel />
      <CalendarDatePagination />
    </CalendarDate>
    <CalendarHeader />
    <CalendarBody features={exampleFeatures}>
      {({ feature }) => <CalendarItem key={feature.id} feature={feature} />}
    </CalendarBody>
  </CalendarProvider>
);
