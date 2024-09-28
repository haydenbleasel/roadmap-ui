import { z } from 'zod';

export const FeatureSchema = z.object({
  id: z.string(),
  name: z.string(),
  startAt: z.date(),
  endAt: z.date(),
});

export const MarkerSchema = z.object({
  id: z.string(),
  date: z.date(),
  label: z.string(),
  backgroundColor: z.string(),
  textColor: z.string(),
});
