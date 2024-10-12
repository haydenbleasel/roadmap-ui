'use client';

import { exampleFeatures } from '@/lib/content';
import * as Calendar from '@repo/calendar';
import type { FC } from 'react';

export const CalendarBasic: FC = () => (
  <Calendar.CalendarProvider>
    <Calendar.CalendarMonth />
    <Calendar.CalendarHeader />
    <Calendar.CalendarBody features={exampleFeatures} />
  </Calendar.CalendarProvider>
);

export const CalendarWithoutMonth: FC = () => (
  <Calendar.CalendarProvider>
    <Calendar.CalendarHeader />
    <Calendar.CalendarBody features={exampleFeatures} />
  </Calendar.CalendarProvider>
);
