import {
  TableHead,
  TableHeader as TableHeaderRaw,
  TableRow,
} from '@roadmap-ui/shadcn-ui/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { type FC, useContext } from 'react';
import { TableContext } from '../contexts/table-context';

export const TableHeader: FC = () => {
  const { table } = useContext(TableContext);

  return (
    <TableHeaderRaw>
      {table?.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeaderRaw>
  );
};
