import {
  TableBody as TableBodyRaw,
  TableCell,
  TableRow,
} from '@roadmap-ui/shadcn-ui/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { type FC, useContext } from 'react';
import { TableContext } from '../contexts/table-context';

export const TableBody: FC = () => {
  const { columns, table } = useContext(TableContext);
  const rows = table?.getRowModel().rows;

  return (
    <TableBodyRaw>
      {rows?.length ? (
        rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBodyRaw>
  );
};
