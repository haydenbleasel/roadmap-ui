import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  endOfDay,
  endOfMonth,
  getDaysInMonth,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import type { Range } from '../types/types';

export const getDifferenceIn = (range: Range) => {
  let fn = differenceInDays;

  if (range === 'monthly' || range === 'quarterly') {
    fn = differenceInMonths;
  }

  return fn;
};

export const getInnerDifferenceIn = (range: Range) => {
  let fn = differenceInHours;

  if (range === 'monthly' || range === 'quarterly') {
    fn = differenceInDays;
  }

  return fn;
};

export const getStartOf = (range: Range) => {
  let fn = startOfDay;

  if (range === 'monthly' || range === 'quarterly') {
    fn = startOfMonth;
  }

  return fn;
};

export const getEndOf = (range: Range) => {
  let fn = endOfDay;

  if (range === 'monthly' || range === 'quarterly') {
    fn = endOfMonth;
  }

  return fn;
};

export const getDateDistance = (
  startAt: Date,
  endAt: Date,
  range: Range,
  columnWidth: number
) => {
  const differenceIn = getDifferenceIn(range);
  const innerDifferenceIn = getInnerDifferenceIn(range);

  const startOf = getStartOf(range);
  const start = startOf(startAt);
  const end = startOf(endAt);

  return (
    differenceIn(end, start) * columnWidth + innerDifferenceIn(startAt, start)
  );
};

export const getAddRange = (range: Range) => {
  let fn = addDays;

  if (range === 'monthly' || range === 'quarterly') {
    fn = addMonths;
  }

  return fn;
};

export const getsDaysIn = (range: Range) => {
  // For when range is daily
  let fn = (_date: Date) => 1;

  if (range === 'monthly' || range === 'quarterly') {
    fn = getDaysInMonth;
  }

  return fn;
};
