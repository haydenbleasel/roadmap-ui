import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type GanttState = {
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
  resizing: boolean;
  setResizing: (resizing: boolean) => void;
  scrollX: number;
  setScrollX: (scrollX: number) => void;
};

export const useGantt = create<GanttState>()(
  devtools((set) => ({
    dragging: false,
    setDragging: (dragging: boolean) => set(() => ({ dragging })),
    resizing: false,
    setResizing: (resizing: boolean) => set(() => ({ resizing })),
    scrollX: 0,
    setScrollX: (scrollX: number) => set(() => ({ scrollX })),
  }))
);
