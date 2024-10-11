import { createContext } from 'react';
import type { GanttContextProps } from '../types/types';

export const GanttContext = createContext<GanttContextProps>({
  zoom: 100,
  range: 'monthly',
  columnWidth: 50,
  headerHeight: 60,
  rowHeight: 36,
  onAddItem: undefined,
  placeholderLength: 2,
  timelineData: [],
  editable: false,
  ref: null,
});
