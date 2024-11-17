import type { ColumnDef, Table } from '@tanstack/react-table';
import { createContext } from 'react';

export const TableContext = createContext<{
  data: unknown[];
  columns: ColumnDef<unknown, unknown>[];
  table: Table<unknown> | null;
}>({
  data: [],
  columns: [],
  table: null,
});
