'use client';

import { exampleFeatures } from '@/lib/content';
import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
} from '@/registry/roadmap-ui/calendar';
import type { FC } from 'react';

const earliestYear =
  exampleFeatures
    .map((feature) => feature.startAt.getFullYear())
    .sort()
    .at(0) ?? new Date().getFullYear();

const latestYear =
  exampleFeatures
    .map((feature) => feature.endAt.getFullYear())
    .sort()
    .at(-1) ?? new Date().getFullYear();

export const CalendarExample: FC = () => (
  <CalendarProvider>
    <CalendarDate>
      <CalendarDatePicker>
        <CalendarMonthPicker />
        <CalendarYearPicker start={earliestYear} end={latestYear} />
      </CalendarDatePicker>
      <CalendarDatePagination />
    </CalendarDate>
    <CalendarHeader />
    <CalendarBody features={exampleFeatures}>
      {({ feature }) => <CalendarItem key={feature.id} feature={feature} />}
    </CalendarBody>
  </CalendarProvider>
);
