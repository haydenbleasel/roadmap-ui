'use client';

import { Button } from '@roadmap-ui/shadcn-ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@roadmap-ui/shadcn-ui/components/ui/dropdown-menu';
import * as ShadcnTable from '@roadmap-ui/shadcn-ui/components/ui/table';
import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { Column, ColumnDef, Table } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useTable } from './use-table';

export const TableContext = createContext<{
  data: unknown[];
  columns: ColumnDef<unknown, unknown>[];
  table: Table<unknown> | null;
}>({
  data: [],
  columns: [],
  table: null,
});

export const TableBody: FC = () => {
  const { columns, table } = useContext(TableContext);
  const rows = table?.getRowModel().rows;

  return (
    <ShadcnTable.TableBody>
      {rows?.length ? (
        rows.map((row) => (
          <ShadcnTable.TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
          >
            {row.getVisibleCells().map((cell) => (
              <ShadcnTable.TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </ShadcnTable.TableCell>
            ))}
          </ShadcnTable.TableRow>
        ))
      ) : (
        <ShadcnTable.TableRow>
          <ShadcnTable.TableCell
            colSpan={columns.length}
            className="h-24 text-center"
          >
            No results.
          </ShadcnTable.TableCell>
        </ShadcnTable.TableRow>
      )}
    </ShadcnTable.TableBody>
  );
};

interface ColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function ColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: ColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const TableHeader: FC = () => {
  const { table } = useContext(TableContext);

  return (
    <ShadcnTable.TableHeader>
      {table?.getHeaderGroups().map((headerGroup) => (
        <ShadcnTable.TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <ShadcnTable.TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </ShadcnTable.TableHead>
          ))}
        </ShadcnTable.TableRow>
      ))}
    </ShadcnTable.TableHeader>
  );
};

type TableProviderProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: ReactNode;
};

export function TableProvider<TData, TValue>({
  columns,
  data,
  children,
}: TableProviderProps<TData, TValue>) {
  const { sorting, setSorting } = useTable();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      // @ts-expect-error updater is a function that returns a sorting object
      const newSorting = updater(sorting);

      setSorting(newSorting);
    },
    state: {
      sorting,
    },
  });

  return (
    <TableContext.Provider
      value={{
        data,
        columns: columns as never,
        table: table as never,
      }}
    >
      <ShadcnTable.Table>{children}</ShadcnTable.Table>
    </TableContext.Provider>
  );
}
