import type { SortingState } from '@tanstack/react-table';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TableState = {
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
};

export const useTable = create<TableState>()(
  devtools((set) => ({
    sorting: [],
    setSorting: (sorting: SortingState) => set(() => ({ sorting })),
  }))
);
